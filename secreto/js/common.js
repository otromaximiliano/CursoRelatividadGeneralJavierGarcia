var PLOT_POTENCIAL_CHART = true;
var INFINITESIMAL = 1e-9;
var E_THRESHOLD_TO_BE_CONSIDERED_ZERO = 1e-7;

var BISECTION_ERROR_THERSHOLD = 1e-10;
var BISECTION_MIN = 1e-9;
var BISECTION_MAX = 5e3;

var POTENTIAL_PLOT_MAX_X = 1e3;
var POTENTIAL_PLOT_RESOLUTION = POTENTIAL_PLOT_MAX_X/5e4;
var G = 6.674E-11;

var defaultInitialConditions = [
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Órbita circular de la Tierra [ r = 10 x Radio ] (r, vr, vphi)',
        inputFormat: 'r-vr-vphi',
        siUnits: true, showPointsData: true,
        timeResolution: 1e14, simulationTime: 1e16,
        M: 5.9722e+24, R: 6371000.0, m: 500.0,
        rSi: 63710000, phi: 0.0, vrSi: 0.0, vrSignSi: 1.0, vphiSi: 0.00003925987071995594
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Órbita circular de la Tierra [ r = 10 x Radio ] (L, epsilon, r)',
        inputFormat: 'L-E-r',
        siUnits: true, showPointsData: true,
        timeResolution: 1e14, simulationTime: 1e16,
        M: 5.9722e+24, R: 6371000.0, m: 500.0,
        rSi: 63710000, phi: 0.0, vrSignSi: 1.0, LSi: 79677202911471.16, ESi: -3128116684.7610626
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Órbita circular de la Tierra: r aleatorio (L, epsilon, r)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 1e11, simulationTime: 7e14,
        M: 5.9722e+24, R: 6371000.0, m: 500.0,
        r: 1216577086.134062, phi: 0.0, vrSign: 1.0, L:24663.506316358, E: -4.1098910000000007e-10
    },
    {
        physics: 'newton-euler',
        name: 'NEWTON - Colisión (caso 2)',
        inputFormat: 'r-vr-vphi',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        r: 16.0, phi: 0.0, vr: 0.0, vphi: 0.0
    },
    {
        physics: 'newton-euler',
        name: 'NEWTON - Parábola (caso 3)',
        inputFormat: 'L-E-vphi',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 5000,
        phi: 1.0, vphi: 0.001, vrSign: -1.0,
        L: 9.48, E: 0.0,
    },
    {
        physics: 'newton-euler',
        name: 'NEWTON - Hipérbola (caso 4)',
        inputFormat: 'r-vr-vphi',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 100,
        r: 16.0, phi: 0.0, vr: 0.0, vphi: 0.08,
    },
    {
        physics: 'newton-euler',
        name: 'NEWTON - Órbita Elíptica (caso 5)',
        inputFormat: 'r-vr-vphi',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        r: 8.0, phi: 0.0, vr: 0.0, vphi: 0.035
    },
    {
        physics: 'newton-euler',
        name: 'NEWTON - Órbita Circular en SI (caso 6)',
        inputFormat: 'L-E-vr',
        timeResolution: 0.01, simulationTime: 1500,
        siUnits: true, showPointsData: true,
        M: 5.97e+24, R: 6371000.0, m: 500.0,
        phiSi: 0.0, vrSi: 0.0,
        LSi: 26719623532036.336, ESi: -13897619421.33626,
    },
    {
        physics: 'schwarzschild-inaki',
        name: 'SCHIÑA - Python default values ¿Gráfico E.Potencial?',
        inputFormat: 'r-vr-vphi',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 2000,
        r: 10.0, phi: 0.0, vr: 0.0, vphi: 0.02
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 0 - Zona 0 (Escape)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 0, E: 1.9375, r: 16.0,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 0 - Zona 0 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 0, E: 1.9375, r: 16.0, vrSign: -1,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 1 - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 5000,
        L: 1.1, E: -0.05, r: 16.0,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 2 - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 1.8, E: -0.08, r: 7.0,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 3 (a) - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 1.9, E: -0.04735184287601163, r: 1.5,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 3 (a) - Zona 2 (Órbita circular inestable)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 1.9, E: -0.04735184287601163, r: 2.1260525615777355,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 3 (b) - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 1.9, E: -0.06, r: 1.5,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 3 (b) - Zona 2 (Órbita elíptica)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 1.9, E: -0.06, r: 10.0,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 3 (b) - Zona 2 (Órbita circular)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 2, E: -0.074074074074074074, r: 6.0,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 4 - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 1.9, E: -0.08450000897584042, r: 1.5,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 4 - Zona 2 (Órbita elíptica)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 1.9, E: -0.075, r: 5.093947438422264,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 4 - Zona 2 (Órbita circular)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 1.9, E: -0.08450000897584042, r: 5.093947438422264,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 5 - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 1.8, E: -0.2, r: 1.3,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 6 - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 2.2, E: 0.1, r: 1.5,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 6 - Zona 2 (Cometa que escapa)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 200,
        L: 2.2, E: 0.1, r: 5, vrSign: -1,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 7 - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 2.2, E: -0.05, r: 1.2,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 7 - Zona 2 (Órbita elíptica)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 2.2, E: -0.05, r: 5.406,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 8 - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 50,
        L: 2.2, E: 0.10922213581784845, r: 1.2, vrSign: 1,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 8 - Zona indefinida (Órbita circular inestable)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 50,
        L: 2.2, E: 0.10922213581784845, r: 5.406, vrSign: -1,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 8 - Zona 2 (Cometa que escapa por los pelos)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 150,
        L: 2.2, E: 0.10922213581784844, r: 10, vrSign: -1,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 9 - Zona 1 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 2.2, E: -0.058851765447478034, r: 1.2,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 9 - Zona 2 (Órbita circular estable)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 2.2, E: -0.058851765447478034, r: 7.824225192575119,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 10 (Colisión)',
        inputFormat: 'L-E-r',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        L: 2.2, E: -0.075, r: 1.085,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 10 (Colisión) - r,vr,vphi',
        inputFormat: 'r-vr-vphi',
        siUnits: false, showPointsData: true,
        timeResolution: 0.01, simulationTime: 1500,
        r: 1.3466314515085671, vr: 0.0, vrSign: 1, vphi: 1.1889547626874881,
    },
    {
        physics: 'schwarzschild-javier',
        name: 'SCHJAV - Caso 10 (Colisión) - r,vr,vphi en SI',
        inputFormat: 'r-vr-vphi',
        siUnits: true, showPointsData: true,
        M: 1e+27, R: 0.01, m: 500.0,
        timeResolution: 0.01, simulationTime: 1500,
        rSi: 1.9999702966941035, vrSi: 0.0, vrSignSi: 1, vphiSi: 240000000,
    },
];

function InvalidInitialConditionsError(message) {
    this.name = 'InvalidInitialConditionsError';
    this.message = (message || '');
    return this;
}
InvalidInitialConditionsError.prototype = Error.prototype;

function processInitialConditions() {
    var initialConditions = getFormData();

    if (initialConditions.siUnits) {
        checkInitialConditionsInSi(initialConditions);
        setHash(initialConditions);
        switch(initialConditions.physics) {
            case 'newton-euler':
            case 'newton-runge-kutta':
                siToBel(initialConditions);
                break;
            
            case 'schwarzschild-inaki':
            case 'schwarzschild-javier':
                siToSchwarzschild(initialConditions);
                break;
        }
        
        fillMissingInitialConditionsFnByPhysics[initialConditions.physics](initialConditions);
    
    } else {
        
        fillMissingInitialConditionsFnByPhysics[initialConditions.physics](initialConditions);
    
        setHash(initialConditions);
        switch(initialConditions.physics) {
            case 'newton-euler':
            case 'newton-runge-kutta':
                belToSi(initialConditions);
                break;
            
            case 'schwarzschild-inaki':
            case 'schwarzschild-javier':
                schwarzschildToSi(initialConditions);
                break;
        }
    }

    var L = initialConditions.L;
    var E = initialConditions.E;

    plotPotentialChartFnByPhysics[initialConditions.physics](L, E);

    return initialConditions;
}

function checkInitialConditionsInSi(initialConditions) {
    var M = initialConditions.M;
    var R = initialConditions.R;
    var m = initialConditions.m;
    if (!M || !R || !m) {
        throw InvalidInitialConditionsError('Los parámetros M, R y m son obligatorios para usar unidades del SI.');
    }
}

function getCaso(L, E) {
    if (L==0) return (E >= 0 ? 1 : 2);

    var circularOrbitE =  (L != 0 ? -1/(2*(Math.pow(L, 2))) : undefined);
    var isCircularOrbit = (E == circularOrbitE);

    if (isCircularOrbit) return 6;

    if (E == 0) return 3;

    if (E > 0) return 4;

    // if (E < 0)
    return 5;
}

function getRadiuses(L, E) {
    var r1, r2, analiticR1, analiticR2;
    var circularOrbitE =  (L != 0 ? -1/(2*(Math.pow(L, 2))) : undefined);
    var isCircularOrbit = (E == circularOrbitE);

    if (isCircularOrbit) {  // caso 6: circular orbit;
        r1 = Math.pow(L, 2);
        r2 = Math.pow(L, 2);
        analiticR1 = r1;
        analiticR2 = r2;

    } else {                 // is NOT circular orbit;

        if (Math.abs(L) > 0) {     // ... casos 3, 4, 5;
            var a = BISECTION_MIN;
            var b = Math.pow(L, 2);
            r1 = bisection(a, b, L, E);

            if (Math.abs(E) < E_THRESHOLD_TO_BE_CONSIDERED_ZERO)
                analiticR1 = (Math.pow(L, 2))/2;
            else
                analiticR1 = (1/(2*E)) * ( -1 + Math.sqrt( 1+2*E*(Math.pow(L, 2)) )  );
        }
        if (E < 0) {          // ... casos 2, 5;
            var a = (Math.abs(L) > 0 ? Math.pow(L, 2) : BISECTION_MIN);
            var b = BISECTION_MAX;
            r2 = bisection(a, b, L, E);
            analiticR2 = (1/(2*E)) * ( -1  -  Math.sqrt( 1+2*E*(Math.pow(L, 2)) )  );
        }
    }

    return { r1: r1, r2: r2, analiticR1: analiticR1, analiticR2: analiticR2 };
}

function getNewtonPotential(r, L) {
    return -1/r + (Math.pow((L/r), 2))/2;
}
function plotTrajectory(xPoints, yPoints) {
    var layout = {
      title: 'Trayectoria',
      paper_bgcolor: '#000',
      plot_bgcolor: '#000',
      showlegend: false,
      font: {
          color: '#fff',
      },
      titlefont: {
          color: '#fff',
      },
      xaxis: {
        title: 'x',
        color: '#fff',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        title: 'y',
        color: '#fff',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    };

    var trajectoryData = [{ x: xPoints, y: yPoints }];
    Plotly.newPlot($('#trajectoryPlot')[0], trajectoryData, layout);
}

function range(start, end) {
  return Array(end - start + 1).fill().map(function(_, idx) { return start + idx; });
}
