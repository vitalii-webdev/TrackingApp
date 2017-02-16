<?php

$isPost = (!empty($_POST)) ? true : false;

if ($isPost) {
	$guid = trim(filter_var($_POST["GUID"], FILTER_SANITIZE_STRING));
	$barcode = trim(filter_var($_POST["barcode"], FILTER_SANITIZE_STRING));
	$culture = trim(filter_var($_POST["culture"], FILTER_SANITIZE_STRING));

	//echo $guid." \r\n".$barcode." \r\n".$culture;

	$client = new SoapClient('http://services.ukrposhta.ua/barcodestatistic/barcodestatistic.asmx?WSDL');

	$params = new stdClass();
	$params->guid = $guid;
	$params->barcode = $barcode;
	$params->culture = $culture;

	$result = $client->GetBarcodeInfo($params)->GetBarcodeInfoResult;

	echo json_encode((array)$result);
}


?>