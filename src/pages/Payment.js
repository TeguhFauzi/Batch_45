function Payment() {
  return (
    <>
      <div className="centered">
        <h1>Premium</h1>
      </div>
      <div className="centeredx">
        <p>
          Bayar sekarang dan nikmati nanti streaming film-film yang kekinian
          dari
        </p>
        <h1>DumbFlix</h1>
      </div>
      <div className="centered">
<h1>DUMBFLIX :</h1><h2>0852 SPNG</h2>
</div>
<div className="centeredz">

<input type="text" class="form-control" id="validationCustom01" placeholder="Input your account number" required/>

</div>

            
<div className="centeredz"><label className="btn btn-danger">
             Attache proof of transfer
                <input
                  type="file"
                  style={{ display: "none" }}

                />
                <i class="fa fa-upload"></i>
              </label></div>
            
              <div className="centereda"><label className="btn btn-danger">
            Send
                <input
                  type="file"
                  style={{ display: "none" }}
                 
                />
              </label
              ></div>

    </>
  );
}
export default Payment;
