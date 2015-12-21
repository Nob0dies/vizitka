<?php

/**
 * Created by PhpStorm.
 * User: evgonchar
 * Date: 20.12.2015
 * Time: 20:44
 */
class Form
{
    private $inputs = array();
    private $errors = array();

    public function __construct($inputs)
    {
        foreach($inputs as &$input)
        {
            if(! $input["type"] || $input["type"]==="text") {
                $input["type"] = "text";
                $input["value"] = $_POST[$input["name"]];
            } elseif($input["type"]==="file") {
                $input["value"] = $_FILES[$input["name"]];
            }
            $this->inputs[] = $input;
        }

        $this->validate();
    }

    private function validate()
    {
        foreach($this->inputs as $input)
        {
            if($input['required'] === true)
            {
                switch($input["type"]){
                    case "text":
                        $this->checkString($input["name"]);
                        break;
                    case "file":
                        $this->checkFile($input["name"]);
                        break;
                    default:
                        die("ТИП ДАННЫХ НЕ ОПРЕДЕЛЕН. ПРОВЕРКА НЕ ВОЗМОЖНА!");
                }
            }
        }
    }

    private function checkString($input)
    {
        // убедитьс в том, что значение $_POST[ $input ] существует...
        if (!(filter_has_var(INPUT_POST, $input)
            //...и не пустое
            && (strlen(filter_input(INPUT_POST, $input)) > 0))
        ) {
            //в случае ошибки записываем имя инпут в массив ошибок
            $this->errors[] = $input;
        }
        return true;
    }

    private function checkFile($input)
    {
        //файл существует...
        if (isset($_FILES[$input])
            //...доставлен без ошибок...
            && ($_FILES[$input]['error'] == UPLOAD_ERR_OK
            //...его размер больше нуля.
            && ($_FILES[$input]['size'] > 0))) {
            return true;
        } else {
            //в случае ошибки записываем имя инпут в массив ошибок
            $this->errors[] = $input;
        }
    }

    public function sendAjaxResponse()
    {
        $data = array(
            "errors" => $this->errors,
        );

        header("Content-Type:application/json");
        echo json_encode($data);
        exit;
    }
}

