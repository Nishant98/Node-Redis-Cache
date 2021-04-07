# Node-Redis-Cache
Node.js &amp; Caching Data using Redis

## Prerequisites
Set up the development environment, Install Node and Redis.

## Clone & Run
- Clone the repository from 
```
git clone https://github.com/Nishant98/Node-Redis-Cache.git
```
- Install Required Dependencies
```
 npm install
```
- To Run the application
```
 npm start
```
- Consume API
``` 
 http://localhost:5000/getWeight/pikachu
```
## Conclusion
Observe the Network Tab from Developer Tools in your browser. Only if the data of a pokemon is not available in cache, the PokeAPI endpoint is hit to fetch the data. If available, it is fetched from Redis thus saving the overall required time.
