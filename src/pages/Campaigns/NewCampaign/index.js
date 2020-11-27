import React, { useState } from 'react';
import { Form } from '@unform/web';
import { FiPlus, FiX } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';

import api from '../../../services/api';
import Button from '../../../components/Button';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './styles.css';

export default function CampaignForm() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: ' ',
    description: ' ',
  });

  const [selectedImage, setSelectedImage] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  const [focus, setFocus] = useState(null);
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { startDate, endDate } = dateRange;

  const handleOnDateChange = (startDate, endDate) => {
    setdateRange(startDate, endDate);
  };

  const handleSelectImages = async (event) => {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setSelectedImage(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return { name: image.name, url: URL.createObjectURL(image) };
    });

    setPreviewImage(selectedImagesPreview);
  };

  function handleRemoveImage(image) {
    setPreviewImage(
      previewImage.map((image) => image).filter((img) => img.url !== image.url)
    );
    setSelectedImage(
      selectedImage
        .map((image) => image)
        .filter((img) => img.name !== image.name)
    );
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file[0]);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit() {
    const { title, description } = formData;

    const base64 = await convertToBase64(selectedImage);

    const data = {
      title,
      description,
      imgUrl: base64,
      dateBegin: startDate._d,
      dateEnd: endDate._d,
    };

    await api.post('/api/campaign', data);

    history.push('/campaigns');
  }

  return (
    <div className="container">
      <Form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', width: '90%' }}
      >
        <h1>Let's get started</h1>

        <h2>1. Which Hero is starring in this campaign?</h2>
        <p>Don't see the hero you want to use? Add a new hero</p>
        <div style={{ display: 'flex', flex: 1 }}>
          <div className="heroInput">
            <div className="images-container">
              {previewImage.map((image) => {
                return (
                  <div key={image.url}>
                    <span
                      className="remove-image"
                      onClick={() => handleRemoveImage(image)}
                    >
                      <FiX size={18} color="#ff669d" />
                    </span>
                    <img
                      src={image.url}
                      alt={image.name}
                      className="new-image"
                    />
                  </div>
                );
              })}
              {previewImage.length === 0 && (
                <label htmlFor="image" className="new-image">
                  <FiPlus size={24} />
                </label>
              )}
            </div>
            <input type="file" id="image" onChange={handleSelectImages} />
          </div>
        </div>

        <div className="titleInput">
          <h2>2. What is hte title of the campaign?</h2>
          <input
            name="title"
            type="text"
            placeholder="Insert the title of the campaign here..."
            onChange={handleInputChange}
          />
        </div>

        <div className="descriptionInput">
          <h2>3. Write a brief description of the campaign.</h2>
          <textarea
            name="description"
            type="text"
            placeholder="Insert the description here..."
            onChange={handleInputChange}
          />
        </div>

        <div className="dateInput">
          <h2>
            4. When will the campaign start and end? This can be updated later.
          </h2>

          <DateRangePicker
            startDatePlaceholderText="Start"
            startDate={startDate}
            onDatesChange={handleOnDateChange}
            endDatePlaceholderText="End"
            endDate={endDate}
            focusedInput={focus}
            onFocusChange={(focus) => setFocus(focus)}
            startDateId="startDateMookh"
            endDateId="endDateMookh"
          />
        </div>
        <div className="buttonContainer">
          <Link to="/campaigns">
            <Button
              style={{
                background: '#f6f6f6',
                border: '1px solid black',
                color: '#000',
                marginRight: '10px',
              }}
            >
              Cancel
            </Button>
          </Link>
          <Button>Create campaign</Button>
        </div>
      </Form>
    </div>
  );
}
