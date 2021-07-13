import React, { useState, FC, ReactElement } from 'react';
import './App.css';
import { Button, Divider, Input } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
const Parse = require('parse/dist/parse.min.js');

interface IParams {
  objectType: string
}

export const ObjectCreationForm: FC<{}> = (): ReactElement => {
  // Navigation parameters
  const history = useHistory();
  const { objectType } = useParams<IParams>();

  // State variables
  const [objectName, setObjectName] = useState('');

  // Functions used by the screen components
  const createObject = async function (): Promise<boolean> {
    // This values come from state variables
    const objectNameValue: string = objectName;

    // Creates a new parse object instance
    let ParseObject: Parse.Object = new Parse.Object(objectType);

    // Set data to parse object
    ParseObject.set('name', objectNameValue);

    // After setting the values, save it on the server
    try {
      await ParseObject.save();
      // Success
      alert('Success!');
      history.push('/');
      return true;
    } catch (error: any) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <div>
      <div className="header">
        <img
          className="header_logo"
          alt="Back4App Logo"
          src={
            'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png'
          }
        />
        <p className="header_text_bold">{'React on Back4App'}</p>
        <p className="header_text">{'React Relations'}</p>
      </div>
      <div className={'container'}>
        <h2 className="heading">{`New ${objectType}`}</h2>
        <Divider />
        <Input
          value={objectName}
          onChange={(event) => setObjectName(event.target.value)}
          placeholder="Name"
          size="large"
        />
        <div className="form_buttons">
          <Button
            onClick={() => createObject()}
            type="primary"
            className="form_button"
            color={'#208AEC'}
            icon={<PlusOutlined />}
            size="large"
          >
            CREATE
          </Button>
        </div>
      </div>
    </div>
  );
};
