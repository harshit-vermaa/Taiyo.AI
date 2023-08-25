import React, { useState, useEffect } from 'react'
import Style from './Contact.module.css'
import Layout from '../../Component/Layout/Layout'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';



const Contact = () => {
  // Creating States 
  const [activity, setActivity] = useState('active');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [contactData, setContactData] = useState([])

  // Edit States 
  const [editToggle, setEditToggle] = useState(true)
  const [editId, setEditId] = useState()


  const handleRadio = (event) => {
    setActivity(event.target.value);
  };

  const handleSave = () => {
    if (firstName && lastName) {
      if (!editToggle) {
        // Editing an existing contact
        setContactData((prevData) =>
          prevData.map((item) =>
            item.id === editId
              ? { ...item, FirstName: firstName, LastName: lastName, activity: activity }
              : item
          )
        );
        setEditToggle(true); // Reset edit mode after saving edits
        setEditId(null); // null EditId after saving edits
      } else {
        // Creating a new contact
        const newContact = {
          id: contactData.length + 1,
          FirstName: firstName,
          LastName: lastName,
          activity: activity,
        };
        setContactData([...contactData, newContact]);
      }
      setFirstName('');
      setLastName('');
      setActivity('active');
    } else {
      alert('Require all the fields');
    }
  };

// Deleting Contact 
  const handleDelete = (idx) => {
    const updatedContacts = contactData.filter((data, index) => index !== idx);
    setContactData(updatedContacts);
  };

  // Edit Contact 
  const handleEdit = (data) => {

    // Again setting the edit contact details to edit it again through main form 
    setEditId(data.id)
    const editfirst = data.FirstName;
    const editlast = data.LastName;
    const editactivity = data.activity
    setFirstName(editfirst)
    setLastName(editlast)
    setActivity(editactivity)
    setEditToggle(false)
  }

  // Getting items from LocalStorage 
  useEffect(() => {
    const storedData = localStorage.getItem('contactData');
    if (storedData) {
      setContactData(JSON.parse(storedData));
    }
  }, []);

  // Saving items to LocalStorage 
  useEffect(() => {
    localStorage.setItem('contactData', JSON.stringify(contactData));
  }, [contactData]);


  return (
    <>
      <Layout>
        <div className={Style.contact}>
          <>
            <div className={Style.contactBox}>
              <h2>{editToggle ? 'Create Contact' : 'Edit Contact'}</h2>
              <div className={Style.contactBox_input}>
                <TextField onChange={(e) => { setFirstName(e.target.value) }} value={firstName} id="outlined-basic" label="First Name" variant="outlined" />
                <TextField onChange={(e) => { setLastName(e.target.value) }} value={lastName} id="outlined-basic" label="Last Name" variant="outlined" />
              </div>
              <div className={Style.contactBox_radio}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={activity}
                    onChange={handleRadio}
                    style={{ display: 'flex', gap: '20px', flexDirection: 'row' }}
                  >
                    <FormControlLabel value="active" control={<Radio />} label="active" />
                    <FormControlLabel value="unactive" control={<Radio />} label="unactive" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={Style.contactBox_btn}>
                <Button style={{width:'150px'}}  variant="contained" onClick={() => { handleSave() }} > {editToggle ? "Save" : "Edit" } </Button>
              </div>
            </div>
          </>
          {/* :
              <> */}
          <div className={Style.contactActive}>
            {
              contactData.length === 0 ?
                <>
                  No Contact Found Create Contact
                </> :
                <>
                  {
                    contactData.map((data, idx) => {
                      return <>
                        <div className={Style.contactActive_card}>
                          <div className={Style.contactActive_cardFeilds}>
                            <p>First Name : {data.FirstName}</p>
                            <p>Last Name : {data.LastName}</p>
                            <p>Activity : {data.activity}</p>
                          </div>
                          <div className={Style.contactActive_cardBtn}>
                            <Button variant="contained" onClick={() => { handleDelete(idx) }} >Delete</Button>
                            <Button variant="contained" onClick={() => { handleEdit(data) }} >Edit</Button>
                          </div>
                        </div>
                      </>
                    })
                  }
                </>
            }
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Contact