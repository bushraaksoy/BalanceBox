import React from 'react';
import Graph from '../components/analytics/Graph';
import SecondaryLayout from '../layouts/SecondaryLayout';
import UploadBankstatement from '../components/analytics/UploadBankstatement';
import SubHeading from '../components/ui/SubHeading';
import AnalyticsPieChart from '../components/analytics/AnalyticsPieChart';

const Analytics = () => {
    return (
        <SecondaryLayout heading="Analytics">
            <div className="px-5 flex flex-col gap-4">
                <UploadBankstatement />
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <SubHeading className="!py-1 !text-sm">
                        Income vs Expenses
                    </SubHeading>
                    <AnalyticsPieChart />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <SubHeading className="!py-1 !text-sm">
                        30 Days Spending
                    </SubHeading>
                    <Graph />
                </div>
            </div>
        </SecondaryLayout>
    );
};

export default Analytics;
