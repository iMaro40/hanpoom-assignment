# Hanpoom Assignment

## How To Run

1. `npm i`
2. Run the Docker container: `npm run docker` (this is using PORT=5432 by default)
3. Run the migrations: `npm run migrate`
4. Seed the database: `npm run seed`
5. Start the server: `npm run start:dev`

## Tests

To run the tests: `npm run test`

## Postman Collection

Import the collection below to hit the API

```
{
	"info": {
		"_postman_id": "19eb7c70-6b9f-46f1-a212-c1a249930cfe",
		"name": "Hanpoom Assignment",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "20111797"
	},
	"item": [
		{
			"name": "GET Picking Slips",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{baseURL}}/api/picking-slips?status=PRINTED&limit=3&offset=0",
					"host": [
						"{{baseURL}}"
					],
					"path": [
						"api",
						"picking-slips"
					],
					"query": [
						{
							"key": "status",
							"value": "PRINTED"
						},
						{
							"key": "limit",
							"value": "3"
						},
						{
							"key": "offset",
							"value": "0"
						}
					]
				}
			},
			"response": []
		}
	],
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "baseURL",
			"value": "localhost:3000",
			"type": "string"
		}
	]
}
```
