<?php
/**
 * Created by PhpStorm.
 * User: evgonchar
 * Date: 17.12.2015
 * Time: 1:50
 */
require_once("Form.php");


/**
 * Предпологаем, что по умолчанию тип передаваемых данных - текст,
 * в случае если выполняется это условие - тогда не указываем тип
 */

$inputs = array(
    array(
        "name" => "name-proj",
        "required" => true,
    ),
    array(
        "name" => "project_url",
        "required" => true,
    ),
    array(
        "name" => "description",
        "required" => true,
    ),
    array(
        "name" => "cover_image",
        "required" => true,
        "type" => "file"
    )
);

$form = new Form( $inputs );
$form->sendAjaxResponse();