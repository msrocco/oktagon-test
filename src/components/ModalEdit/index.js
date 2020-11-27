import React, { useState, useEffect } from 'react';

import Modal from '../Modal';
import {
  Row,
  Form,
  Button,
  ListGroup,
  Col,
  Card,
  ButtonToolbar,
  ButtonGroup,
  Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ModalEdit = ({
  isOpen,
  setOpenModal,
  selectedCampaign,
  handleUpdateCampaign,
}) => {
  const [campaign, setCampaign] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateBegin, setDateBegin] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  useEffect(() => {
    async function loadCampaign() {
      setIsFetching(false);
      const response = await api.get(`/api/campaign/${selectedCampaign._id}`);

      setCampaign(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDateBegin(new Date(response.data.dateBegin).toDateString());
      setDateEnd(new Date(response.data.dateEnd).toDateString());
      setIsFetching(false);
    }

    loadCampaign();
  }, [selectedCampaign]);

  function handleSubmit() {
    handleUpdateCampaign({
      title,
      description,
    });

    setOpenModal(false);
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={() => setOpenModal(false)}>
      <Form className="pt-5 pl-2 pr-2">
        {isFetching ? (
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Form.Group>
            <Row className="mb-3">
              <Col lg="8" md="8" className="pl-0">
                <Form.Label className="label-custom">Title</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Title"
                  id="campaign"
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Form.Label className="label-custom">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
              <Col lg="4" md="4" className="pr-0">
                <Card className="h-100">
                  <Card.Img className="h-100" src={campaign.imgUrl} />
                </Card>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="label-custom">Schedule</Form.Label>
            </Row>
            <Row className="mb-3">
              {new Date(dateBegin).toDateString()} -{' '}
              {new Date(dateEnd).toDateString()}
            </Row>
            <Row className="mb-3">
              <Form.Label className="label-custom">Actions</Form.Label>
            </Row>
            <Row className="mb-3">
              <Form.Label className="label-custom">Open Tasks</Form.Label>
            </Row>
            <Row className="mb-3">
              <ListGroup>
                <ListGroup.Item className="list-group-item-none" disabled>
                  No tasks added yet.
                </ListGroup.Item>
              </ListGroup>
            </Row>
            <Row className="mt-5">
              <ButtonToolbar>
                <ButtonGroup className="mr-2">
                  <Link to="/campaigns">
                    <Button
                      variant="outline-secondary"
                      id={campaign._id}
                      onClick={handleSubmit}
                    >
                      Save and exit
                    </Button>
                  </Link>
                </ButtonGroup>
                <ButtonGroup>
                  <Link to="/actions/add">
                    <Button variant="primary">Add action</Button>
                  </Link>
                </ButtonGroup>
              </ButtonToolbar>
            </Row>
          </Form.Group>
        )}
      </Form>
    </Modal>
  );
};

export default ModalEdit;
