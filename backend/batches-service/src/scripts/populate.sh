eval "docker exec -it new_batches-mongo_1 mongoimport --port 27018 --db batches --collection batches --type json --file ../../scripts/mocks/_batches.json --jsonArray"
