<?php
/**
 * Created by PhpStorm.
 * User: evgonchar
 * Date: 20.12.2015
 * Time: 15:21
 */

require_once("Form.php");

$inputs = array(
    array(
        "name" => "name",
        "required" => true,
    ),
    array(
        "name" => "mail",
        "required" => true,
    ),
    array(
        "name" => "massage",
        "required" => true,
    ),
    array(
        "name" => "cod",
        "required" => true,
    ),
);

$form = new Form( $inputs );
$form->sendAjaxResponse();