import React from 'react';
import { icons } from "../../../../assets/icons";
import AppGrid from "../../../../containers/grid/AppGrid";
import UiPreviewCard from "../../components/uiPreviewCard/UiPreviewCard";
import AppSpinner from "../../../../components/spiner/AppSpinner";

const { Row, Col } = AppGrid;

const ROW_GUTTER = 24;

const Spinner = (props) => {
    return (
        <Row gutter={ROW_GUTTER} vStretch={true}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <UiPreviewCard name="Size" description="Component fixed size config">
                    <div className="d-flex flex-row vh-align-center" style={{gap: 20}}>
                        <AppSpinner indicator={icons.ic_app_logo} width={128} height={128}/>
                        <AppSpinner indicator={icons.ic_app_logo} width={72} height={72}/>
                        <AppSpinner indicator={icons.ic_app_logo} width={32} height={32}/>
                    </div>
                </UiPreviewCard>
            </Col>
        </Row>
    );
};

export default React.memo(Spinner);