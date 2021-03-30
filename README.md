# Projektfabrik Task

Technologies: Typescript, NodeJS, Express, React, Docker
Other technologies/tools can be chosen independently as desired

The system is to be developed based on a MicroService architecture.
A REST interface should be available to the user.

The system should represent a simple ordering process. The data models are the order, the items and the user.

The user should be able to initiate an order.
The user should be able to retrieve a list of items with their quantity.
An order consists of several articles and is assigned to a user.
When a order has been created, the number of articles still available is to be reduced.
If an article is no longer available, it must not be ordered.

The user should have a UI Interface to see items and create a order

# Solution

Build with care and love :heart:.

## Clone the repo 

`git clone https://github.com/MalekMK/Projektfabrik_task.git`

## Go to the folder

`cd ./Projektfabrik_task`

## Run docker-compose to start the app

`docker-compose up --build`

## Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

________________________________________________________________________

###  Once the app is started, you can import items data to mongodb only one time by the following command:

`cd ./data && mongoimport --db task --collection items --file items.json`



