# ANOUT24_D01_COMPASSCAR

This project brings the API back-end of a car management.

## How to use

Comand to start the API: npm run start

Run tests: npm run secure-mode

The API have the following actions:

1.  Cars registration:
    To register a car, call the POST method on the URL: "server_adress:port/api/v1/cars".
    Send, on the body of the request, 4 required atributes with the following rules:

         • brand: just a string.
         • model: just a string.
         • year: integer not older than 10 years considering the next year.
         • plate: string with an especific format. Three letters, a dash(-), one number, one number or letter, two numbers. Plates must be unique.

    If successful, the API will return a response with a json with 6 atributes (id, brand, model, year, plate, created_at) and a status 201.

2.  Car items registration:
    After the car is registered, you can also insert the items for the car, sending an array of items. You can also use this action to update the car items.
    Call the PUT method on the URL: "server_adress:port/api/v1/cars/:id/items".
    Send the array of items on the body of the request and replace :id on the URL path with the car id.
    If successful, the response will be a status 204.

3.  Car search and listing:

    a) You can list your car by id, wich returns only the car with all it's items.
    Call the GET method on the URL: "server_adress:port/api/v1/cars/:id".
    Replace :id on the URL path with the car id.
    If successful, the API will return a response with a json with 7 atributes (id, brand, model, year, plate, created_at, items) and a status 200.

    b) You can make a list of cars with optional parameters:
    Call the GET method on the URL: "server_adress:port/api/v1/cars".
    Send the optional parameters on the body of the request to filter the results. The parameters are:

             • year: an integer that returns cars from or after that year.
             • final_plate: an integer that returns cars that has the number as it's plate last digit.
             • brand: an string that returns cars with the string on it brand.
             • page: page number to return.
             • limit: number os cars per page.

    If successful, the API will return a response with a json with the car list and a status 200.

4.  Car updating:
    You can update a car, sending any of the 4 atributes explained on item 1, but you have to follow the same rules. Also, you have to update the model if you update the brand, so you have to send brand and model.
    Call the PATCH method on the URL: "server_adress:port/api/v1/cars/:id".
    Send, on the body of the request, the atributes you want to change and replace :id on the URL path with the car id.
    If successful, the API will return a response with a status 204.

5.  Deleting car:
    You can delete a car by id.
    Call the DELETE method on the URL: "server_adress:port/api/v1/cars/:id".
    Replace :id on the URL path with the car id.
    If successful, the API will return a response with a status 204.

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
