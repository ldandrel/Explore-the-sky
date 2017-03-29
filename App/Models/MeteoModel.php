<?php
namespace App\Models;

use Cmfcmf\OpenWeatherMap;
use Cmfcmf\OpenWeatherMap\Exception as OWMException;

class MeteoModel extends Model
{
    public static function meteo($address)
    {
        static $weather;

// Language of data (try your own language here!):
        $lang = 'fr';

// Units (can be 'metric' or 'imperial' [default]):
        $units = 'metric';

// Create OpenWeatherMap object.
// Don't use caching (take a look into Examples/Cache.php to see how it works).
        $owm = new OpenWeatherMap('6d12398b89b0ee175ad413d00b422e75');

        try {
            $weather = $owm->getWeather('Berlin', $units, $lang);
        } catch (OWMException $e) {
            return 'OpenWeatherMap exception: ' . $e->getMessage() . ' (Code ' . $e->getCode() . ').';
        } catch (\Exception $e) {
            return 'General exception: ' . $e->getMessage() . ' (Code ' . $e->getCode() . ').';
        }

        return $weather->temperature;
    }

    public static function city($address)
    {

        if (empty($address)) {
            return false;
        } else {
            // url encode the address
            $address = urlencode($address);

            // google map geocode api url
            $url = "http://maps.google.com/maps/api/geocode/json?address={$address}";

            // get the json response
            $resp_json = file_get_contents($url);

            // decode the json
            $resp = json_decode($resp_json, true);

            // response status will be 'OK', if able to geocode given address
            if($resp['status']=='OK'){

                // get the important data
                $lati = $resp['results'][0]['geometry']['location']['lat'];
                $longi = $resp['results'][0]['geometry']['location']['lng'];
                $formatted_address = $resp['results'][0]['formatted_address'];

                // verify if data is complete
                if($lati && $longi && $formatted_address){

                    // put the data in the array
                    $data_arr = array();

                    array_push(
                        $data_arr,
                        $lati,
                        $longi,
                        $formatted_address
                    );

                    return $data_arr;

                }else{
                    return false;
                }

            }else{
                return false;
            }

        }
    }
}