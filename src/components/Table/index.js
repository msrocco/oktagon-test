import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Table as TableBootstrap } from 'react-bootstrap';
import ReactModal from 'react-modal';

import api from '../../services/api';
import Button from '../Button';

import './styles.css';
import ModalEdit from '../ModalEdit';

export default function Table() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function loadCampaings() {
      const response = await api.get('/api/campaign');

      setCampaigns(response.data);
    }

    loadCampaings();
  }, []);

  const handleDelete = async () => {
    await api.delete(`/api/campaign/${selectedCampaign._id}`);

    setOpenModal(false);
  };

  const handleUpdateCampaign = async () => {
    const response = await api.put(`/api/campaign/${selectedCampaign._id}`, {
      ...selectedCampaign,
      ...campaigns,
    });

    setCampaigns(
      campaigns.map((c) =>
        c.id === selectedCampaign.id ? { ...response.data } : c
      )
    );
  };

  return (
    <>
      <TableBootstrap bordered hover>
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Buddy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td>{campaign.title}</td>
              <td>{new Date(campaign.dateBegin).toDateString()}</td>
              <td>{new Date(campaign.dateEnd).toDateString()}</td>
              <td>{campaign.status}</td>
              <td>{campaign.buddy}</td>
              <td>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AiOutlineEdit
                    size={20}
                    color="#000"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedCampaign(campaign);
                    }}
                  />
                  <AiOutlineDelete
                    size={20}
                    color="#000"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedCampaign(campaign);
                    }}
                    style={{ marginLeft: '6px', cursor: 'pointer' }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableBootstrap>
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={() => setOpenModal(false)}
        isOpen={openModal}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            height: '300px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        <div className="modalContent">
          <div className="leftSideModal">
            <h1>Delete Campaign</h1>
            <p>
              Do you want to delete the{' '}
              <strong>{selectedCampaign.title}</strong> campaign?
            </p>
            <div>
              <Button
                onClick={() => setOpenModal(false)}
                style={{
                  background: '#f6f6f6',
                  border: '1px solid black',
                  color: '#000',
                  marginRight: '10px',
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          </div>
          <div className="rightSideModal">
            <img src={selectedCampaign.imgUrl} alt={selectedCampaign.title} />
          </div>
        </div>
      </ReactModal>

      <ModalEdit
        isOpen={openModal}
        setOpenModal={setOpenModal}
        selectedCampaign={selectedCampaign}
        handleUpdateCampaign={handleUpdateCampaign}
      />
    </>
  );
}
