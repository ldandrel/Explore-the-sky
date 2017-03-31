# Explore the Sky

A website experience to see all the constellations with their informations.

![Explore the sky](http://explore-the-sky.com/assets/img/space_exploration.png)

### Features
* Sky with all the constellations drawing
* Slider with all the constellations
* Slide bar for the informations of the constellation choose
* Search bar
* Current date and hour
* City you enter with meteo

### Usage

#### Requirements
* [Composer](https://getcomposer.org/) installed

#### Dev requirements
* [Node.js](https://nodejs.org/en/) installed
* [Composer](https://getcomposer.org/) installed


#### Installation
- Use `composer install` on root folder
- Import database structure from `database.sql`
- Update config values in `App/Config.php`
- Set the `public` folder as Web server root

#### API endpoints
The base URL for all API resources is `/api`. The default returned MIME type for requests is always `application/json`.

##### Constellations

| Endpoint | Description |
| ---- | --------------- |
| GET /constellations/ | Get all constellations |
| GET /constellations/?id= | Get a specific constellation (with neighbours id, neigbours name, neigbours ra, neigbours declinaison) |
| GET /constellations/?name= | Get a specific constellation (use for live search) |


### Dependencies used
#### Front-end
* [VirtualSky.js](https://github.com/slowe/VirtualSky)

#### Back-end
* [Twig](https://github.com/twigphp/Twig)

### TO DO
* [ ] Gyro for mobile experience
