import React from 'react';
import Graph from '../../components/analytics/Graph';
import SecondaryLayout from '../../layouts/SecondaryLayout';
import UploadBankstatement from '../../components/analytics/UploadBankstatement';
import SubHeading from '../../components/ui/SubHeading';
import AnalyticsPieChart from '../../components/analytics/AnalyticsPieChart';

const Analytics = () => {
    return (
        <SecondaryLayout heading="Analytics">
            <div className="px-5">
                <UploadBankstatement />
                <SubHeading>Income vs Expenses</SubHeading>
                <AnalyticsPieChart />
                <SubHeading>30 Days Spending</SubHeading>
                <Graph />
            </div>
        </SecondaryLayout>
    );
};

export default Analytics;
