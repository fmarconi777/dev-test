<?php

namespace Util;

class RecursosUtil {

    /**
     * @return array
     */

    public static function getRecurso() {
        $urls = self::getUrls();
        $request = [];
        $request['recurso'] = $urls[0] ?? null;
        $request['id'] = $urls[1] ?? null;
        $request['metodo'] = $_SERVER['REQUEST_METHOD'];

        return $request;
    }

    /**
     * @return false/string[]
     */

    public static function getUrls() {
        $uri = str_replace('/'.DIR_PROJETO, '', $_SERVER['REQUEST_URI']);
        return explode('/', trim($uri, '/'));
    }
}