import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

ComfirmOrder.propTypes = {

};

function ComfirmOrder(props) {
    return (
        <div>
            <Modal
                title="Handle Order"
                visible={true}
            >
            </Modal>
        </div>
    );
}

export default ComfirmOrder;