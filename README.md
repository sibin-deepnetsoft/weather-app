# Assumptions
  1) Best Day to sell an umbrella is considered as the data in which "data.weather.main" equals "Rain" and the "data.rain" has the maximum value.
  2) Best Day to sell a jacket is considered as the data in which "data.weather.main" not equals "Rain" (Do we need this check?) and the "data.temp.day" has the least value.

# To run the project,
In the project directory, you can run:

### `npm install`
### `npm start`

# Sample urls for testing
http://localhost:3000/?city=new+york  
http://localhost:3000/?city=seattle