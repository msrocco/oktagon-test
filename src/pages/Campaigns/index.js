import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';

import Button from '../../components/Button';
import Table from '../../components/Table';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './styles.css';

export default function Campaigns() {
  const { TabPane } = Tabs;

  return (
    <div className="container">
      <div className="header">
        <div className="title-container">
          <p className="title">Campaigns</p>
        </div>
        <div className="input-container">
          <input type="text" placeholder="Search for a campaign" />
        </div>
        <Link to="/campaign/new">
          <Button>New Campaign</Button>
        </Link>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Recent" key="1">
          <Table />
        </TabPane>
      </Tabs>
    </div>
  );
}
