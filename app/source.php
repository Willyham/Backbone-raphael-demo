<?php

$scriptDir = 'scripts';

function getJSfiles($dir){
    $items = glob($dir . '/*');
    $files = array();
    for ($i = 0; $i < count($items); $i++) {
        if (is_dir($items[$i])) {
            $add = glob($items[$i] . '/*.js');
            $files = array_merge($files, $add);
        }
    }
    return $files;
}

$files = getJSfiles($scriptDir);

$models = array();
$id = 0;
foreach($files as $file){
    if( ($code = file_get_contents($file)) !== FALSE){
        $code = htmlentities($code);
        $code = str_replace('RaphaelTransformableView', '<b>RaphaelTransformableView</b>', $code);
        array_push($models, array('id' => $id, 'name' => $file, 'code' => $code));
        $id++;
    }
}

echo json_encode($models);

