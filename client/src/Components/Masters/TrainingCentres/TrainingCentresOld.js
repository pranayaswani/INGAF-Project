import React from "react";


const TrainingCentres = () => {
  return (
    <div className="card">
      <div className="row col-md-12">
        <div className="panel panel-primary mt-3">
          <div  className="panel-heading text-center panel-relative mt-2">
            <h3>Training Centres</h3>
          </div>
          <div className="panel-body">
            <form>
              <div className="input-group">
                <label for="training_centre">Training Centre</label>                
                <input id="training_centre" type="text" className="form-control" name="training_centre" autoComplete="off"/>
              </div>

              <div className="input-group">
                <label for="address">Office Address</label>                
                <textarea class="form-control" rows="3" id="address" autoComplete="off"></textarea>                
              </div>
              <div className="input-group">
                <label for="state">Select City</label>                
                <select className="form-control" id="state">
                  <option value="0">---Select City---</option>
                  <option>Delhi</option>
                  <option>Chennai</option>
                  <option>Mumbai</option>
                  <option>Kolkata</option>                  
                  <option>Aizawl</option>                  
                </select>
              </div>
              <div className="row">
              <div className="input-group col-md-6">
                <label for="email_id">E-Mail ID</label>                
                <input id="email_id" type="text" className="form-control" autoComplete="off" name="email_id"/>
              </div>

              <div className="input-group col-md-6">
                <label for="contact_person">Contact Person</label>                
                <input id="contact_person" type="text" className="form-control" autoComplete="off" name="contact_person"/>
              </div>
              </div>
              <div className="row">
              <div className="input-group col-md-6" >
                <label for="phone_nos">Phone Nos.</label>                
                <input id="phone_nos" type="text" className="form-control" autoComplete="off" name="phone_nos"/>
              </div>
              <div className="input-group col-md-6">
                <label for="mobile_no">Mobile Nos.</label>                
                <input id="mobile_no" type="text" className="form-control" autoComplete="off" name="mobile_no"/>
              </div>
              </div>
              <div className="input-group">
                <label for="status">Select Status</label>                
                <select className="form-control" id="status">
                  <option value="0">---Select Status---</option>
                  <option>Active</option>
                  <option>InActive</option>
                </select>
              </div>


              <br />
              <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="submit" className="btn btn-danger">Reset</button>
            </form>
          </div>
          <div className="panel-footer">
            <small>Message:</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCentres;
