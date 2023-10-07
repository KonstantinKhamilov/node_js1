CREATE TABLE Patients (
    ID INT PRIMARY KEY,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    BirthDate DATE,
    Address VARCHAR(255)
);

CREATE TABLE Doctors (
    ID INT PRIMARY KEY,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    Specialization VARCHAR(100)
);

CREATE TABLE Contracts (
    ID INT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    ContractDate DATE,
    FOREIGN KEY (PatientID) REFERENCES Patients(ID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(ID)
);

CREATE TABLE Referrals (
    ID INT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    ReferralDate DATE,
    FOREIGN KEY (PatientID) REFERENCES Patients(ID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(ID)
);

CREATE TABLE Appointments (
    ID INT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    ReferralID INT,
    AppointmentDate DATE,
    Symptoms TEXT,
    Prescriptions TEXT,
    FOREIGN KEY (PatientID) REFERENCES Patients(ID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(ID),
    FOREIGN KEY (ReferralID) REFERENCES Referrals(ID)
);
