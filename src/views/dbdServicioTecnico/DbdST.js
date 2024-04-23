import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import { fetchMetricsByState } from '../../redux/actions/deviceActions';

// Importaciones de Material-UI
import { Typography, Card, CardContent} from '@mui/material';
import { makeStyles } from '@mui/styles';
// Importaciones de @tabler/icons-react
import { IconCircleCheckFilled, IconCircleCaretRight, IconCircleXFilled, IconInnerShadowLeftFilled } from '@tabler/icons-react';

const useStyles = makeStyles({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    card: {
        margin: "20px",
        width: '240px',
        backgroundColor: 'transparent'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

const colorMap = {
    "Completado": "#4CAF50",  // Verde
    "EnProgreso": "#FFC107", // Amarillo
    "Pendiente": "#FF5722",  // Rojo
    "Total": "#3F51B5"       // Azul
};

const iconMap = {
    "Completado": <IconCircleCheckFilled size={40} color={colorMap["Completado"]} />,
    "EnProgreso": <IconCircleCaretRight size={40} color={colorMap["EnProgreso"]} />,
    "Pendiente": <IconCircleXFilled size={40} color={colorMap["Pendiente"]} />,
    "Total": <IconInnerShadowLeftFilled size={40} color={colorMap["Total"]} />
};

const DbdST = ({ fetchMetricsByState, tables }) => {
    const classes = useStyles();
    const [metricsByState, setMetricsByState] = useState({
        "Completado": 0,
        "EnProgreso": 0,
        "Pendiente": 0,
        "Total": 0
    });

    useEffect(() => {
        fetchMetricsByState();
    }, [fetchMetricsByState]);

    useEffect(() => {
        if (tables) {
            setMetricsByState(tables);
        }
    }, [tables]);

    return (
        <PageContainer description="this is DBDST page">
            <DashboardCard title="DASHBOARD SERVICIO TÉCNICO">
                <div className={classes.cardContainer}>
                    {
                        Object.entries(metricsByState).map(([key, value]) => (
                            <Card 
                                key={key} 
                                className={classes.card} 
                                style={{ borderColor: colorMap[key], borderWidth: '2px', borderStyle: 'solid' }}
                            >
                                <CardContent className={classes.content}>
                                    {iconMap[key]}
                                    <Typography variant="h5">{key}</Typography>
                                    <Typography variant="h6">{value}</Typography>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </DashboardCard>
            <Typography variant="h6">example:</Typography>
        </PageContainer>
    );
};

const mapStateToProps = (state) => ({
    tables: state.deviceReducer.metricsByState,
});

const mapDispatchToProps = {
    fetchMetricsByState
};

export default connect(mapStateToProps, mapDispatchToProps)(DbdST);
