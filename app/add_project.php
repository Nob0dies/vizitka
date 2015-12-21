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
    [
        "name" => "name-proj",
        "required" => true,
    ],
    [
        "name" => "project_url",
        "required" => true,
    ],
    [
        "name" => "description",
        "required" => true,
    ],
    [
        "name" => "cover_image",
        "required" => true,
        "type" => "file"
    ]
);

$form = new Form( $inputs );
$form->sendAjaxResponse();
echo json_encode(array(
    $_FILES['cover_image']['error'],
    $_FILES['cover_image']['size'],
));