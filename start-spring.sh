#!/bin/bash

cd ./server
mvn clean package -DskipTests
java -jar target/dataviz-api-0.0.1-SNAPSHOT.jar