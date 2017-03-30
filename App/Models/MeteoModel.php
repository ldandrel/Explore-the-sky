<?php
namespace App\Models;

use Cmfcmf\OpenWeatherMap;
use Cmfcmf\OpenWeatherMap\Exception as OWMException;

class MeteoModel extends Model
{
    public static function meteo($city)
    {
        $lang = 'fr';
        $units = 'metric';

        $owm = new OpenWeatherMap('6d12398b89b0ee175ad413d00b422e75');

        try {
            $weather = $owm->getWeather($city, $units, $lang);
        } catch (OWMException $e) {
            return 'OpenWeatherMap exception: ' . $e->getMessage() . ' (Code ' . $e->getCode() . ').';
        } catch (\Exception $e) {
            return 'General exception: ' . $e->getMessage() . ' (Code ' . $e->getCode() . ').';
        }

        return ['icon' => 'http:' . $weather->weather->getIconUrl(), 'sunrise' => $weather->sun->rise->format('H\hi'), 'sunset' =>  $weather->sun->set->format('H\hi')];

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
                    $data = ['lati' => $lati, 'longi' => $longi, 'address' => $formatted_address];

                    return $data;

                }else{
                    return false;
                }

            }else{
                return false;
            }

        }
    }
}