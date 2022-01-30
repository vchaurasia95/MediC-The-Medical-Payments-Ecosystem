# API Contracts

## User
---
### Create new user 

> POST : http://0.0.0.0:4041/api/user/register

Payload:
```json
{
	"details": {
		"name": "Digant",
		"decentralized_id": "0x4D1352799C05456762Bfc88E95323eF1b2D7d8as5",
		"role": "admin"
	}
}
```

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "Congratulations you've been registered successfully.",
  "result": {
    "_id": 1,
    "details": {
      "name": "Digant",
      "decentralized_id": "0x4D1352799C05456762Bfc88E95323eF1b2D7d8as5",
      "role": "admin"
    },
    "__v": 0
  }
}
```

Error:
```json
{
  "status": "error",
  "code": "Bad Request",
  "message": "The request body contains a field that already exists in DB.",
  "result": ""
}
```

### Get a user by id

> GET : http://0.0.0.0:4041/api/user?_id=1

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": {
    "_id": 1,
    "name": "Digant",
    "decentralized_id": "0x4d1352799c05456762bfc88e95323ef1b2d7d8d4",
    "role": "admin",
    "escrowBalance": 0,
    "__v": 0
  }
}
```

### Get all users

> GET : http://0.0.0.0:4041/api/user/all

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": [
    {
      "_id": 1,
      "name": "Digant",
      "decentralized_id": "0x4d1352799c05456762bfc88e95323ef1b2d7d8d4",
      "role": "admin",
      "escrowBalance": 0,
      "__v": 0
    }
  ]
}
```

## Agreement
---
### Add new agreement 

> POST : http://0.0.0.0:4041/api/agreement/

Payload:
```json
{
	"details": {
		"dummy":"dummy"
	}
}
```

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "Agreement created successfully.",
  "result": {
    "_id": 3,
    "details": {
      "dummy": "dummy"
    },
    "__v": 0
  }
}
```

### Get a agreement by id

> GET : http://0.0.0.0:4041/api/agreement?_id=1

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": {
    "_id": 1,
    "details": {
      "dummy": "dummy"
    },
    "__v": 0
  }
}
```

### Get all agreements

> GET : http://0.0.0.0:4041/api/agreement/all

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": [
    {
      "_id": 1,
      "details": {
        "dummy": "dummy"
      },
      "__v": 0
    }
  ]
}
```

## BILLS
---
### Add new bill 

> POST : http://0.0.0.0:4041/api/bill/

Payload:
```json
{
	"details": {
		"dummy":"dummy"
	}
}
```

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "Bill generated successfully.",
  "result": {
    "_id": 1,
    "details": {
      "dummy": "dummy"
    },
    "__v": 0
  }
}
```

### Get a bill by id

> GET : http://0.0.0.0:4041/api/bill?_id=1

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": {
    "_id": 1,
    "details": {
      "dummy": "dummy"
    },
    "__v": 0
  }
}
```

### Get all bills

> GET : http://0.0.0.0:4041/api/bill/all

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": [
    {
      "_id": 1,
      "details": {
        "dummy": "dummy"
      },
      "__v": 0
    }
  ]
}
```

## Hospitalization Records
---
### Add a new Hospitalization Record 

> POST : http://0.0.0.0:4041/api/hospitalization-record/

Payload:
```json
{
	"details": {
		"dummy":"dummy"
	}
}
```

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "Hospilatization record created successfully.",
  "result": {
    "_id": 2,
    "details": {
      "dummy": "dummy"
    },
    "__v": 0
  }
}
```

### Update a Hospitalization Record 

> PATCH : localhost:4041/api/hospitalization-record

Payload:
```json
{
	"_id": 1,
	"details": {
		"dummy":"dummy2"
	}
}
```

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "Hospilatization record updated successfully.",
  "result": {
    "acknowledged": true,
    "modifiedCount": 0,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```

### Get a Hospitalization Record by id

> GET : http://0.0.0.0:4041/api/hospitalization-record?_id=1

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": {
    "_id": 1,
    "details": {
      "dummy": "dummy"
    },
    "__v": 0
  }
}
```

### Get all Hospitalization Records

> GET : http://0.0.0.0:4041/api/hospitalization-record/all

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": [
    {
      "_id": 1,
      "details": {
        "dummy": "dummy"
      },
      "__v": 0
    }
  ]
}
```

## Policy
---
### Add new policy 

> POST : http://0.0.0.0:4041/api/policy

Payload:
```json
{
	"details": {
		"dummy":"dummy"
	}
}
```

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "Policy created successfully.",
  "result": {
    "_id": 4,
    "details": {
      "dummy": "dummy"
    },
    "__v": 0
  }
}
```

### Get a policy by id

> GET : http://0.0.0.0:4041/api/policy?_id=1

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": {
    "_id": 1,
    "details": {
      "dummy": "dummy"
    },
    "__v": 0
  }
}
```

### Get all policies

> GET : http://0.0.0.0:4041/api/policy/all

Success:
```json
{
  "status": "success",
  "code": 200,
  "message": "",
  "result": [
    {
      "_id": 1,
      "details": {
        "dummy": "dummy"
      },
      "__v": 0
    }
  ]
}
```