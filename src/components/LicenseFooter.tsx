import { Col, Modal, Row, Button, Divider } from 'antd';
import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export interface ILicenseFooterProps {
}

export default function LicenseFooter(props: ILicenseFooterProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
            <Row justify="end">
                <Col>
                    <AiOutlineInfoCircle
                        size={40}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowModal(true)} />
                </Col>
            </Row>
            <Modal
                footer={<Button onClick={() => setShowModal(false)}>Ok</Button>}
                onCancel={() => setShowModal(false)}
                visible={showModal}>
                <Divider >MIT License</Divider>
                Copyright 2021 Achim Strauss
                <br /><br />
                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                <br /><br />
                The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                <br /><br />
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                <Divider >Open Gaming License</Divider>
                Open Gaming License
                <br /><br />
                All Monster stats content, as well as the conditions for players and monsters,
                are based on data provided by Wizards of the cost and fall under the Open Gaming License.
            Detailed information regarding this license can be found <a target="_blank" 
             href="https://dnd.wizards.com/articles/features/systems-reference-document-srd">here</a>.
            <br /><br />
            A copy of the license can be viewed <a target="_blank" href="./opengaminglicense.pdf">here</a>.

        </Modal>
        </>
    );
}
