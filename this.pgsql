┌──────────────┐        ┌───────────────┐       ┌───────────────┐
|   AdminUser  |        |   Application |       |    Country     |
|--------------|        |---------------|       |----------------|
| Id (PK)      |◄───────| Id (PK)       |──────►| Id (PK)        |
| Username     |        | ApplicantName |       | Name           |
| PasswordHash |        | PassportNo    |       | Requirements   |
|              |        | CountryId (FK)|       | VisaFee        |
└──────────────┘        | Status        |       | ProcessingTime |
                        | CreatedAt     |       |                |
                        | aplicant info |       └────────────────┘
                        | AdminId (FK)  |
                        └─────┬─────────┘
                              │
                ┌────────────▼────────────┐
                |      Payment            |
                |-------------------------|
                | Id (PK)                 |
                | ApplicationId (FK)      |
                | Status (Paid/Unpaid)    |
                | DueDate                 |
                └─────────────────────────┘

                ┌─────────────────────────┐
                |      Document           |
                |-------------------------|
                | Id (PK)                 |
                | ApplicationId (FK)      |
                | FileName                |
                | FilePath                |
                └─────────────────────────┘
