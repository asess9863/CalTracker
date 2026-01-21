CREATE DATABASE IF NOT EXISTS MacroTracker;
-- create a table of users
create TABLE IF NOT EXISTS User(
	UserID INT auto_increment NOT NULL,
    UserName CHAR(40),
    CalorieGoal INT,
    ProteinGoal INT,
    CarbGoal INT,
    FatGoal INT,
    primary key(UserID)
);
-- users may have many interactions but an interaction must have
-- exactly one user
CREATE TABLE IF NOT EXISTS Interactions(
	InteractionID INT AUTO_INCREMENT NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY(UserID) REFERENCES User(UserID),
    PRIMARY KEY(InteractionID)
);
-- food is an informational class that is used to load pre entered info.
CREATE TABLE IF NOT EXISTS Food(
	FoodID INT AUTO_INCREMENT NOT NULL,
    Name CHAR(40),
    Calories INT,
    Protein INT,
    Carbs INT,
    Fats INT,
    PRIMARY KEY(FoodID)
);
-- servings hold the portions of the foods ate
-- so 100g of rice or 300g 93-7 ground Beef
CREATE TABLE IF NOT EXISTS Servings(
	ServingID INT AUTO_INCREMENT NOT NULL,
    AmmountAte INT,
    FoodID INT,
    FOREIGN KEY(FoodID) REFERENCES Food(FoodID),
    PRIMARY KEY(ServingID)
);
-- Interactions are Composed of Servings, Composed will act as a connecting table
-- from servings to Interactions
CREATE TABLE IF NOT EXISTS Composed(
	InteractionID INT NOT NULL,
    ServingID INT NOT NULL,
    FOREIGN KEY(InteractionID) REFERENCES Interactions(InteractionID),
	FOREIGN KEY(ServingID) REFERENCES Servings(ServingID)
);

-- Creating Foods
INSERT INTO Food (Name, Calories, Protein, Carbs, Fats) VALUES ("Apple", 95, 1, 25, 0);
INSERT INTO Food (Name, Calories, Protein, Carbs, Fats) VALUES ("Orange", 62, 1, 15, 0);
INSERT INTO Food (Name, Calories, Protein, Carbs, Fats) VALUES ("Banana", 105, 1, 27, 0);
INSERT INTO Food (Name, Calories, Protein, Carbs, Fats) VALUES ("Mango", 99, 1, 25, 1);
INSERT INTO Food (Name, Calories, Protein, Carbs, Fats) VALUES ("Pineapple", 82, 1, 22, 0);
INSERT INTO Food (Name, Calories, Protein, Carbs, Fats) VALUES ("Grapes", 62, 1, 16, 0);
INSERT INTO Food (Name, Calories, Protein, Carbs, Fats) VALUES ("Tomato", 22, 1, 5, 0);
INSERT INTO Food (Name, Calories, Protein, Carbs, Fats) VALUES ("Pear", 101, 1, 27, 0);

-- Create A Admin User
INSERT INTO User (UserName, CalorieGoal, ProteinGoal, CarbGoal, FatGoal) VALUES ("Adam Sessions", 3500, 230, 400, 120);
-- Create A interaction between User and a Food
INSERT INTO Interactions (UserID) VALUES (1);
-- create a Serving
INSERT INTO Servings (AmmountAte, FoodID) VALUES (2,3);
-- Create a Composed of table, including the interaction and the servings ate
INSERT INTO Composed VALUES (1,1);
