#!/bin/bash

# Run both frontend and backend in parallel
# Start Spring Boot backend
./start-spring.sh &
SPRING_PID=$!

# Start Vite frontend
./start-frontend.sh &
VITE_PID=$!

# Handle shutdown
trap "kill $SPRING_PID $VITE_PID" EXIT

# Keep script running
wait