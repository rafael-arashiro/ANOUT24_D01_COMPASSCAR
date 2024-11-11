# ANOUT24_D01_COMPASSCAR

This project brings the API back-end of a car management.

## How to use

The API have the following actions:

1.  Cars registration:
    To register a car, you have to give 4 required atributes with the following rules:

         • brand: just a string.
         • model: just a string.
         • year: integer not older than 10 years considering the next year.
         • plate: string with an especific format. Three letters, a dash(-), one number, one number or letter, two numbers. Plates must be unique.

    The API will then return the registered car with 6 atributes: id, brand, model, year, plate, created_at.

    After the car is registered, you can also insert the items for the car, sending an array of items.

2.  Car search and listing:

    a) You can list your car by id, wich returns only the car with all it's items.

    b) You can make a list of cars with optional parameters:

             • year: an integer that returns cars from or after that year.
             • final_plate: an integer that returns cars that has the number as it's plate last digit.
             • brand: an string that returns cars with the string on it brand.
             • page: page number to return.
             • limit: number os cars per page.

3.  Car updating:
    You can update a car, sending any of the 4 atributes explained on item 1, but you have to follow the same rules. Also, you have to update the model if you update the brand, so you have to send brand and model.

    You can also update the items in any car.

4.  Deleting car:
    You can delete a car by id.

## API Database

The database is named compasscar. It has two tables with the following columns and atributes.

    Table: cars
        Columns:
            • id: integer, auto increment and primary key.
            • brand: string, not null.
            • model: string, not null.
            • year: integer, not null.
            • plate: string, not null.
            • created_at: timestamp, not null.

    Table: cars_items
        Columns:
            • id: integer, auto increment and primary key,
            • name: array of strings.
            • car_id: integer, not null.
            • date: timestamp, not null.
            The car_id, in table cars_items, is referenced to id, in table cars.

## Environment Variables

To thisprojetct, you have to set the following environment variables in your .env

`SERVER`

`DB_USER`

`DB_PASSWORD`

## Stack

**Back-end:** Node, Express
