import React from 'react';
import VaulDrawer from './Drawer';
import DrawerInput from '../inputs/DrawerInput';

const AddGoalDrawer = ({ trigger }) => {
    return (
        <VaulDrawer title="Add A Saving Goal" trigger={trigger}>
            <div className="content">
                <form action="" className="py-3 flex flex-col gap-3">
                    <DrawerInput
                        type="text"
                        name={'title'}
                        id={'title'}
                        placeholder={'Title'}
                    />
                    <DrawerInput
                        type="text"
                        name={'description'}
                        id={'description'}
                        placeholder={'Description'}
                    />
                    <DrawerInput
                        type="number"
                        name={'amount'}
                        id={'amount'}
                        placeholder={'Amount'}
                    />
                    {/* //TODO: these two must be select type */}
                    <div className="flex gap-2">
                        <DrawerInput
                            type="text"
                            name={'frequency'}
                            id={'frequency'}
                            placeholder={'Select Frequency'}
                        />
                        <DrawerInput
                            type="category"
                            name={'category'}
                            id={'category'}
                            placeholder={'Category'}
                        />
                    </div>
                    <button></button>
                </form>
            </div>
        </VaulDrawer>
    );
};

export default AddGoalDrawer;
