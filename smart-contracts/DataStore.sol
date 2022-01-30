// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./erc20.sol";

contract DataStore is MediC {
    address _owner;
    //To Store User Category 1=> Admin, 2=> Hospital, 3=> Insurer, 4=> Doctor, 5 Patient
    mapping(address => uint) user_type;
    mapping(address => uint) escrow_balance;
    mapping(address => uint) token_balance;
    uint _token_threshold;
    event ContractBalanceLow(uint);
    event EscrowBalanceLow(uint, address);
    // MediC token
    constructor(uint token_threshold) {
        require((token_threshold > 0), "token_threshold must be greater than 0");
        _owner = msg.sender;
        user_type[msg.sender] = 1;
        // payable(address(this)).transfer(_amount);
        approve(address(this), _totalSupply);
        // transferFrom(msg.sender,address(this), _totalSupply);
        token_balance[address(this)] = _totalSupply;
        _token_threshold = token_threshold;
    }
    
    mapping (address => address[]) hospital_doctors;

    mapping (address=> address) doctor_hospital;


    //For Storing Hospitalization Record
    struct HospitalizationRecord {
        uint timestamp;
        uint[] performed_procedures;
    }
    //For Storing Policy data
    struct Policy {
        // Procedure type(0-index)Coverage %(1-2index pos)
        uint[] coverage;
        uint max_value;
        uint meta_id;
        uint cost;
        address provider;
    }
    //For Storing Specific Procedure Details
    struct ProcedureDetails {
        address doctor;
        uint procedure_id;
        uint timestamp;
    }
    mapping (uint => HospitalizationRecord) hospitalizationRecords;
    //Procedure Details Id => Prcedure details
    mapping (uint => ProcedureDetails) procedures_mapping;
    //PolicyID (DB) => Policy Struct
    mapping (uint => Policy) policy_mapping;
    //Patient address => PolicyID => balance
    mapping (address => mapping(uint => uint)) patient_policy_balance;
    // address => policyID
    mapping (address => uint) patient_policy;
    //hopitalization Record ID => Procedures_ids[] 
    mapping (uint => uint[]) hospitalization_procedures;
    //Patient => HospitalizationRecord[]
    mapping (address => uint[]) patient_hospitalizations;
    mapping (address => uint[]) hospital_records;
    mapping (address => mapping(address => uint)) hospital_doctor_agreement;
    mapping (address => uint) doctor_hospital_agreement;
    //For Storing Cost associated to a particular procedure 
    mapping (address => mapping(uint => uint)) hospital_procedure_costs;
    mapping (uint => uint) procedure_type;

    modifier onlyAdmin {
        require(user_type[msg.sender] == 1);
        _;
    }

    modifier onlyHospital {
        require(user_type[msg.sender] == 2);
        _;
    }

    modifier onlyInsurer {
        require(user_type[msg.sender] == 3);
        _;
    }

    modifier onlyPatient {
        require(user_type[msg.sender] == 5);
        _;
    }
    
    modifier onlyDoctor {
        require(user_type[msg.sender] == 4);
        _;
    }
    
    modifier onlyHospitalOrInsurer {
        require(user_type[msg.sender] == 2 || user_type[msg.sender] == 3);
        _;
    }
    
    function requestTokens(uint _amount) public{
        require((_amount > 0), "amount to request tokens must be greater than 0");
        require((_amount <= token_balance[address(this)]), "amount to request tokens must be less than or equal to the token balance");
        transferFrom(address(this), msg.sender,_amount);
        if (token_balance[address(this)]< _token_threshold)
            emit ContractBalanceLow(token_balance[address(this)]);
    }
    
    function addEscrowBalance(uint _amount)public onlyHospitalOrInsurer{
        require((_amount > 0), "amount to request tokens must be greater than 0");
        escrow_balance[msg.sender] = escrow_balance[msg.sender]+_amount;
        transfer(address(this), _amount);
    }
    
    function getContactBalance()public view returns(uint) {
        return token_balance[address(this)];
    }
    
    function getEscrowBalance(address _address)public view returns(uint) {
        return escrow_balance[_address];
    }
    
    function replenishContractBalance(uint _amount) public onlyAdmin {
        transfer(address(this), _amount);
        token_balance[address(this)] = token_balance[address(this)]+ _amount;
    }
    
    function addNetworkParticipants(uint _user_type, address participant) public onlyAdmin {
        require((_user_type > 0) && (_user_type<=5), "_user_type must be betweeen 1 and 5");
        user_type[participant] = _user_type;
        approve(address(this),participant,_totalSupply);
        approve(participant,address(this),_totalSupply);
    }
    
    function addDoctor(address _doctor, uint agreementDetails) public onlyHospital {
        user_type[_doctor] = 4;
        approve(address(this), _doctor, _totalSupply);
        approve(_doctor,address(this) , _totalSupply);
        hospital_doctors[msg.sender].push(_doctor);
        doctor_hospital[_doctor] = msg.sender;
        addHospitalDoctorAgreement(_doctor, agreementDetails);
    }

    function getAssociatedDoctors(address _hospital)public view returns(address[] memory){
        require(user_type[_hospital] == 2, "Should Be A Valid Hospital Address");
        return hospital_doctors[_hospital];
    }

    function getAssociatedHospital(address _doctor)public view returns(address){
        require(user_type[_doctor] == 4, "Should Be A Valid Doctor Address");
        return doctor_hospital[_doctor];
    }
    
    function getDocArrayLength()public view returns (uint){
        return hospital_doctors[msg.sender].length;
    }
    
    function addPatients() public {
        user_type[msg.sender] = 5;
        approve(address(this),msg.sender,_totalSupply);
        approve(msg.sender,address(this),_totalSupply);
    }
    
    function addProcedureType(uint _procedure_id, uint _procedure_type)public onlyAdmin{
        procedure_type[_procedure_id] = _procedure_type;
    }
    
    function getProcedureType(uint _procedure_id) public view returns(uint){
        return procedure_type[_procedure_id];
    }
    
    function getUserType()public view returns(uint){
        return user_type[msg.sender];
    }
    
    function getUserType(address user)public view returns(uint){
        return user_type[user];
    }
    
    function replenishEscrowBalance(uint _amount) public onlyHospitalOrInsurer{
        transferFrom(msg.sender,address(this),_amount);
        escrow_balance[msg.sender] = escrow_balance[msg.sender] + _amount;
        token_balance[address(this)] = token_balance[address(this)] + _amount;
    }

    function addPolicy(uint[] memory _coverage, uint _max_value, uint _cost, uint _meta_id, uint _policy_id) public onlyInsurer returns(bool) {
        require((_cost > 0), "_cost must be greater than zero.");
        require((_max_value > 0), "_max_value must be greater than zero.");

        Policy storage newPolicy = policy_mapping[_policy_id];
        newPolicy.max_value = _max_value;
        newPolicy.meta_id = _meta_id;
        newPolicy.provider = msg.sender;
        newPolicy.cost = _cost;
        newPolicy.coverage = _coverage;
        return true;
    }
    //returns cost, max_value, meta_id,provider,coverage
    function viewPolicy(uint _policy_id) public view returns(uint,uint,uint,address,uint[] memory){
        require((policy_mapping[_policy_id].cost != 0), "_policy_id doesn't exist.");

        Policy memory pol = policy_mapping[_policy_id];
        
        return (pol.cost, pol.max_value, pol.meta_id, pol.provider, pol.coverage);
    }

    // patient can enroll to selected policy
    function enrollPolicy(uint _policy_id) public onlyPatient returns(bool) {
        require((policy_mapping[_policy_id].cost != 0), "_policy_id doesn't exist.");

        require((patient_policy[msg.sender] == 0), "msg.sender already holds a policy.");

        patient_policy[msg.sender] = _policy_id;
        patient_policy_balance[msg.sender][_policy_id] = policy_mapping[_policy_id].max_value;
        transfer(policy_mapping[_policy_id].provider,policy_mapping[_policy_id].cost);
        return true;
    }
    
    //To update the policy balance
    function updatePatientPolicyBal(uint _policy_id, address _patient, uint amount)internal {
        require((policy_mapping[_policy_id].cost != 0), "_policy_id doesn't exist.");
        require ((patient_policy_balance[_patient][_policy_id] > 0) , "patient not enrolled to policy or balance finished");
        
        uint originalCost = patient_policy_balance[_patient][_policy_id];

        require((amount > 0), "amount must be greater than 0.");
        require((originalCost >= amount), "amount must be less than or equal to the policy balance");
        
        originalCost = originalCost - amount;
        patient_policy_balance[msg.sender][_policy_id] = originalCost;
    }
    
    function getPatientPolicy(address _patient) public view returns(uint, uint){
        require((user_type[_patient] == 5), "_patient doesn't exist.");
        require((patient_policy[_patient] != 0), "_patient is not mapped to a policy.");

        return (patient_policy[_patient],patient_policy_balance[_patient][patient_policy[_patient]]);
    }
    
    //Add procedure cost
    function addProcedureCost(uint _procedure_id, uint _cost) public onlyHospital{
        require((procedure_type[_procedure_id] != 0), "_procedure_id doesn't exist.");
        require(_cost > 0 , "_cost must be greater than 0.");
        hospital_procedure_costs[msg.sender][_procedure_id] = _cost;
    }

    //Add Bulk procedure cost
    function addBulkProcedureCost(uint[] memory _procedure_id, uint[] memory _cost) public onlyHospital{
        require(_procedure_id.length == _cost.length, "All Procedures should have corresponding Cost");
        
        for(uint i=0;i<_procedure_id.length;i++){
            require((procedure_type[_procedure_id[i]] != 0), "_procedure_id should exist.");
            require(_cost[i] > 0 , "_cost must be greater than 0.");
            hospital_procedure_costs[msg.sender][_procedure_id[i]] = _cost[i];
        }
    }
    
    //get Procedure Cost
    function getProcedureCost(uint _procedure_id)public view returns(uint){
        require((procedure_type[_procedure_id] != 0), "_procedure_id doesn't exist.");
        return hospital_procedure_costs[msg.sender][_procedure_id];
    }
    
    function addHospitalDoctorAgreement(address _doctor, uint _agreement_details)internal{
        doctor_hospital_agreement[_doctor] = _agreement_details;
        hospital_doctor_agreement[msg.sender][_doctor] = _agreement_details;
    }
    
    function getDoctorAgreement()public view onlyDoctor returns(uint){
        return doctor_hospital_agreement[msg.sender];
    }
    
    function getHospitalAgreement(address _doctor)public view onlyHospital returns(uint){
        require((user_type[_doctor] == 4), "_doctor doesn't exist.");
        return hospital_doctor_agreement[msg.sender][_doctor];
    }
    
    //add hospitalizationRecord
    function addHospitlizationRec(address _patient,uint _meta_id, uint _timestamp) public onlyHospital returns(bool){
        require((user_type[_patient] == 5), "_patient doesn't exist.");
        
        HospitalizationRecord storage record = hospitalizationRecords[_meta_id];
        record.timestamp = _timestamp;
        hospital_records[msg.sender].push(_meta_id);
        patient_hospitalizations[_patient].push(_meta_id);
        return true;
    }

    
    
    function getPatientHospitalizationRecords(address _patient) public view returns(uint[] memory){
        require((user_type[_patient] == 5), "_patient doesn't exist.");
        uint[] memory records = patient_hospitalizations[_patient];
        return records;
    }
    
    function getPatientHospitalizationDetails(uint _hospitalization_meta_id)public view returns(uint[] memory, uint){
        // TODO: Hospitalization Meta Id should exist => Cannot maps to a mapping

        HospitalizationRecord memory rec = hospitalizationRecords[_hospitalization_meta_id];
        return (rec.performed_procedures, rec.timestamp);
    }
    
    function addPatientProcedure(uint _hospitalization_id, address _doctor, uint _timestamp, uint _procedure_details_id, uint _procedure_id) public onlyDoctor{

        // TODO: _hospitalization ID should exist => Cannot maps to a mapping

        require(hospitalizationRecords[_hospitalization_id].timestamp > 0, "Record should exist");
        require((user_type[_doctor] == 4), "_doctor doesn't exist.");

        ProcedureDetails storage procedure = procedures_mapping[_procedure_details_id];
        procedure.doctor = _doctor;
        procedure.timestamp = _timestamp;
        procedure.procedure_id = _procedure_id;
        hospitalizationRecords[_hospitalization_id].performed_procedures.push(_procedure_details_id);
    }
    
    
    function getProcedureDetails(uint _procedure_details_id) public view returns(address,uint, uint){
        //_procedure_details_id ID should exist
        require((procedures_mapping[_procedure_details_id].procedure_id != 0), "_procedure_details_id doesn't exist.");

        ProcedureDetails memory pd = procedures_mapping[_procedure_details_id];
        return (pd.doctor, pd.timestamp, pd.procedure_id);
    }
    
    function getInsuranceClaim(uint _amount, address _hospital, address _insurer, uint _policy_id, address _patient)public onlyHospital{
        require((_amount > 0) , "_amount must be greater than 0.");
        require((patient_policy_balance[_patient][_policy_id] >= _amount) , "patient should have sufficient balance left in the policy");
        require((_amount <= escrow_balance[_insurer]) , "_amount must be less than or equal to the escrowed amount.");
        transferFrom(address(this),_hospital,_amount);
        escrow_balance[_insurer] = escrow_balance[_insurer]-_amount;
        updatePatientPolicyBal(_policy_id, _patient, _amount);
        token_balance[address(this)] = token_balance[address(this)] - _amount;
    }
    
    function settleDoctorPayment(address _doctor, uint _amount)public onlyHospital{
        require((_amount > 0), "_amount must be greater than 0.");
        require((_amount <= escrow_balance[msg.sender]) , "_amount must be less than or equal to the escrowed amount.");
        transferFrom(address(this), _doctor, _amount);
        escrow_balance[msg.sender] = escrow_balance[msg.sender]- _amount;
        token_balance[address(this)] = token_balance[address(this)] - _amount;
    }
}
