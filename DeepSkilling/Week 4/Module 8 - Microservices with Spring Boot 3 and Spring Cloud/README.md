# Microservices Hands-on Exercise — Account & Loan

This zip contains two independent Spring Boot Maven projects, each with its own `pom.xml`:

```
microservices/
├── account/     -> GET /accounts/{number}   (runs on port 8080)
└── loan/        -> GET /loans/{number}      (runs on port 8081)
```

## Setup

1. On your machine, create a folder with your employee id in `D:\` drive
   (e.g. `D:\E1234567`).
2. Copy the `microservices` folder (this whole folder) into that employee-id folder,
   so you end up with `D:\E1234567\microservices\account` and
   `D:\E1234567\microservices\loan`.

## Account Microservice

- Group: `com.cognizant`
- Artifact: `account`
- Dependencies: Spring Web, Spring Boot DevTools
- Endpoint: `GET /accounts/{number}`
- Sample response:
  ```json
  {
    "number": "00987987973432",
    "type": "savings",
    "balance": 234343
  }
  ```
- Runs on the default port **8080**.

### Build & Run
```
cd D:\E1234567\microservices\account
mvn clean package
```
Then import the project into Eclipse (File > Import > Existing Maven Projects),
and run `AccountApplication.java` as a Java Application (or Spring Boot App).

Test in browser: `http://localhost:8080/accounts/00987987973432`

## Loan Microservice

- Group: `com.cognizant`
- Artifact: `loan`
- Dependencies: Spring Web, Spring Boot DevTools
- Endpoint: `GET /loans/{number}`
- Sample response:
  ```json
  {
    "number": "H00987987972342",
    "type": "car",
    "loan": 400000,
    "emi": 3258,
    "tenure": 18
  }
  ```
- Configured with `server.port=8081` in `application.properties` because port
  8080 will already be in use by the Account service.

### Build & Run
```
cd D:\E1234567\microservices\loan
mvn clean package
```
Import into Eclipse the same way, then run `LoanApplication.java`.

If you try to run it while it still has the default port (8080) and the
Account service is already running, you'll see:

```
***************************
APPLICATION FAILED TO START
***************************

Description:

Web server failed to start. Port 8080 was already in use.
```

That's why `server.port=8081` is already set in this project's
`application.properties`.

Test in browser: `http://localhost:8081/loans/H00987987972342`

## Running Both Together

1. Start `AccountApplication` first (uses port 8080).
2. Start `LoanApplication` next (uses port 8081).
3. Both services will now be running simultaneously, each in its own Eclipse
   console tab. Use the monitor icon in the Console view to switch between
   the two running consoles.
