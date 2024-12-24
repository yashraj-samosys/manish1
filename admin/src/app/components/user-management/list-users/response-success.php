<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');
require('vendor/autoload.php');
use TapPayments\GoSell;
GoSell::setPrivateKey("sk_test_Hoh7x4PMvKFk9NArYw5ODXS0");

$ch_id=$_GET['tap_id'];
$retrieved_charge = GoSell\Charges::retrieve($ch_id);

$response['gateway_txn_id']=$ch_id;
$response['order_id']=$retrieved_charge->reference->order;
$resposne['status']=$retrieved_charge->status;
$response['amount']=$retrieved_charge->amount;
$response['payment_status']=$retrieved_charge->status;
$response['status']=true;

print_r($retrieved_charge);exit();
if($retrieved_charge->status == 'CAPTURED'){
$conn=new mysqli('192.168.0.6', "homecraft", "yqDGQtjnfmKM3BxF", "homecraft");
if($conn->connect_error)
{
    die("connection faild:".$conn->connect_error);
}
$sql="UPDATE orders SET payment_id=".$ch_id.",payment_type='gateway',payment_json=".json_encode($retrieved_charge).",payment_status='true',status=0 WHERE id=".$retrieved_charge->reference->order;
$res=$conn->query($sql);
header("location: final_response.php");
}else{
header("location: final_response.php");
}
echo json_encode($response);
?>
