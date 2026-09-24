/* @ds-bundle: {"format":3,"namespace":"DynamicsVRDesignSystemWebapp_713fcf","components":[],"sourceHashes":{"prototypes/dynamics-platform/Academy.jsx":"fb36e9806784","prototypes/dynamics-platform/CrearSesiones.jsx":"19694788ad7b","prototypes/dynamics-platform/Home.jsx":"5b8cd1d010f0","prototypes/dynamics-platform/PatientList.jsx":"cc2658a8bb05","prototypes/dynamics-platform/Sidebar.jsx":"5e3ec22001e9","prototypes/dynamics-platform/Streaming.jsx":"3ca08229f125","prototypes/dynamics-platform/Topbar.jsx":"3cba5389634c","ui_kits/dynamics-platform/Alerts.jsx":"9e252229db39","ui_kits/dynamics-platform/Buttons.jsx":"74d42f594ff4","ui_kits/dynamics-platform/Cards.jsx":"a546d123f7c8","ui_kits/dynamics-platform/Inputs.jsx":"50a8362ae20d","ui_kits/dynamics-platform/Misc.jsx":"758f737bbe90","ui_kits/dynamics-platform/Overlays.jsx":"4fcbd4a07a39","ui_kits/dynamics-platform/Selects.jsx":"6baaf3cb8626","ui_kits/dynamics-platform/Tables.jsx":"dce0df8177a4","ui_kits/dynamics-platform/Tabs.jsx":"ec8165e288f1","ui_kits/dynamics-platform/Tags.jsx":"5d13216df83f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DynamicsVRDesignSystemWebapp_713fcf = window.DynamicsVRDesignSystemWebapp_713fcf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// prototypes/dynamics-platform/Academy.jsx
try { (() => {
/* eslint-disable */
/* Dynamics Platform UI kit — Academy screen.
   Greeting + KPI strip + weekly activity chart + course player + level card + achievements. */

function AcadIcon({
  name
}) {
  const m = {
    book: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 5a2 2 0 0 1 2-2h12v17H6a2 2 0 0 0-2 2V5z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 19a2 2 0 0 0 2 2h12"
    })),
    medal: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "14",
      r: "6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 8L5 2h5l2 4 2-4h5l-3 6"
    })),
    clock: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v5l3 2"
    })),
    target: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1.6",
      fill: "currentColor"
    })),
    trend: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 16l5-5 4 4 7-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 8h6v6"
    })),
    play: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 5l11 7-11 7V5z"
    })),
    chev: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6"
    })),
    trophy: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 4h8v4a4 4 0 0 1-8 0V4z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 4H4v3a3 3 0 0 0 4 3M18 4h2v3a3 3 0 0 1-4 3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 14h6v2H9zM10 16h4v3h-4z"
    })),
    bolt: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M13 2L4 14h7l-1 8 9-12h-7l1-8z"
    })),
    star: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 2l3 6.5 7 .8-5.2 4.7L18.3 22 12 18.5 5.7 22l1.5-8L2 9.3l7-.8z"
    }))
  };
  return m[name];
}
function StatTile({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  chev
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dvr-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-stat__icon",
    style: {
      background: iconBg,
      color: iconColor
    }
  }, /*#__PURE__*/React.createElement(AcadIcon, {
    name: icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-stat__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-stat__label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "dvr-stat__value numeric"
  }, value)), chev && /*#__PURE__*/React.createElement("span", {
    className: "dvr-stat__chev"
  }, /*#__PURE__*/React.createElement(AcadIcon, {
    name: "chev"
  })));
}
function WeeklyChart() {
  const data = [{
    d: 'L',
    v: 40
  }, {
    d: 'M',
    v: 52
  }, {
    d: 'X',
    v: 14
  }, {
    d: 'J',
    v: 92
  }, {
    d: 'V',
    v: 36
  }, {
    d: 'S',
    v: 0
  }, {
    d: 'D',
    v: 78
  }];
  const max = 100;
  return /*#__PURE__*/React.createElement("div", {
    className: "dvr-weekly"
  }, data.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "dvr-weekly__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-weekly__bar-wrap"
  }, b.v > 0 && /*#__PURE__*/React.createElement("div", {
    className: "dvr-weekly__bar " + (b.d === 'D' ? "is-strong" : ""),
    style: {
      height: b.v / max * 100 + "%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-weekly__day"
  }, b.d))));
}
function Academy() {
  return /*#__PURE__*/React.createElement("section", {
    className: "dvr-page dvr-academy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__greet"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "dvr-academy__h"
  }, "Hola, ", /*#__PURE__*/React.createElement("strong", null, "Cristian"), " ", /*#__PURE__*/React.createElement("span", {
    className: "dvr-wave"
  }, "\uD83D\uDC4B")), /*#__PURE__*/React.createElement("p", {
    className: "dvr-academy__sub"
  }, "Contin\xFAa tu camino hacia la excelencia en fisioterapia con VR")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__stats"
  }, /*#__PURE__*/React.createElement(StatTile, {
    icon: "book",
    iconBg: "#E9EDFF",
    iconColor: "#2F76F7",
    label: "En progreso",
    value: "2"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "medal",
    iconBg: "#D1FADF",
    iconColor: "#12B76A",
    label: "Completados",
    value: "4",
    chev: true
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "clock",
    iconBg: "#ECE9FB",
    iconColor: "#7B6AE2",
    label: "Minutos",
    value: "145"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "target",
    iconBg: "#FFF1E1",
    iconColor: "#F3A257",
    label: "Racha",
    value: "7d"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-panel dvr-academy__activity"
  }, /*#__PURE__*/React.createElement("header", {
    className: "dvr-academy__activity-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__activity-lbl"
  }, "Actividad semanal"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__activity-val"
  }, /*#__PURE__*/React.createElement("span", {
    className: "numeric"
  }, "145"), " ", /*#__PURE__*/React.createElement("span", null, "minutos"))), /*#__PURE__*/React.createElement("span", {
    className: "dvr-academy__delta"
  }, /*#__PURE__*/React.createElement(AcadIcon, {
    name: "trend"
  }), " 24%")), /*#__PURE__*/React.createElement(WeeklyChart, null)), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__level"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__level-lbl"
  }, "Nivel actual"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__level-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__level-badge numeric"
  }, "3"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__level-title"
  }, "Fisioterapeuta"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__level-sub"
  }, "en Formaci\xF3n"))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__xp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__xp-row"
  }, /*#__PURE__*/React.createElement("span", null, "Experiencia"), /*#__PURE__*/React.createElement("span", {
    className: "numeric"
  }, "850 / 1000 XP")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__xp-bar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '85%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__next"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__next-lbl"
  }, "Pr\xF3xima certificaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__next-row"
  }, /*#__PURE__*/React.createElement("span", null, "Certificaci\xF3n B\xE1sica"), /*#__PURE__*/React.createElement("span", {
    className: "numeric"
  }, "1/3 cursos")))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__lesson"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__lesson-kicker"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-academy__dot"
  }), " Contin\xFAa donde lo dejaste"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__lesson-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__lesson-thumb"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__lesson-img"
  }), /*#__PURE__*/React.createElement("button", {
    className: "dvr-academy__play"
  }, /*#__PURE__*/React.createElement(AcadIcon, {
    name: "play"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__lesson-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__lesson-sub"
  }, "Dynamics Platform \xB7 Lecci\xF3n 2 de 3"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__lesson-title"
  }, "Introducci\xF3n a la plataforma"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__lesson-progress"
  }, /*#__PURE__*/React.createElement(AcadIcon, {
    name: "clock"
  }), /*#__PURE__*/React.createElement("span", {
    className: "numeric"
  }, "02:50 / 04:25"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-academy__lesson-sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "64% completado")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-academy__continue"
  }, "Continuar lecci\xF3n ", /*#__PURE__*/React.createElement(AcadIcon, {
    name: "chev"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-panel dvr-academy__achievements"
  }, /*#__PURE__*/React.createElement("header", {
    className: "dvr-academy__ach-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__ach-count"
  }, /*#__PURE__*/React.createElement(AcadIcon, {
    name: "trophy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "numeric"
  }, "2")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__ach-title"
  }, "Logros y Reconocimientos"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__ach-sub"
  }, "2 de 10 desbloqueados"))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-academy__ach-grid"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-academy__ach-cell is-on"
  }, /*#__PURE__*/React.createElement(AcadIcon, {
    name: "star"
  })), /*#__PURE__*/React.createElement("span", {
    className: "dvr-academy__ach-cell is-on"
  }, /*#__PURE__*/React.createElement(AcadIcon, {
    name: "bolt"
  })), Array.from({
    length: 8
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "dvr-academy__ach-cell"
  }, /*#__PURE__*/React.createElement(AcadIcon, {
    name: i % 3 === 0 ? "medal" : i % 3 === 1 ? "trophy" : "bolt"
  })))))));
}
Object.assign(window, {
  Academy
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/dynamics-platform/Academy.jsx", error: String((e && e.message) || e) }); }

// prototypes/dynamics-platform/CrearSesiones.jsx
try { (() => {
/* eslint-disable */
/* Dynamics Platform UI kit — Crear sesiones (Sesiones personalizadas).
   Left: searchable list of session templates. Right: detail with task table. */

const SESIONES = [{
  id: 'carlos',
  name: 'Carlos (HOMBRO)',
  programs: ['H']
}, {
  id: 'carquel',
  name: 'CarQuel',
  programs: ['C', 'N'],
  tareas: [{
    name: 'Velocidad de movimiento',
    prog: 'N',
    goal: 'Ritmo Bongos',
    lvl: 5,
    dur: "2'"
  }, {
    name: 'Equilibrio',
    prog: 'N',
    goal: 'Explota burbujas',
    lvl: 7,
    dur: "2'"
  }, {
    name: 'Motricidad fina',
    prog: 'N',
    goal: 'Alimentos al plato',
    lvl: 6,
    dur: "2'"
  }, {
    name: 'Motricidad gruesa',
    prog: 'N',
    goal: 'Pincel mágico',
    lvl: 7,
    dur: "2'"
  }],
  total: '8 minutos'
}, {
  id: 'cervical-aspain',
  name: 'Cervical Aspain',
  programs: ['C']
}, {
  id: 'cervical-prueba',
  name: 'Cervical Prueba',
  programs: ['C']
}, {
  id: 'cervicaloffline',
  name: 'CervicalOffline',
  programs: ['C']
}, {
  id: 'demooffline',
  name: 'DemoOffline',
  programs: ['H', 'C', 'N']
}];
const PROG_TONE = {
  C: {
    bg: '#75B7FF',
    label: 'Cervical'
  },
  L: {
    bg: '#4385FA',
    label: 'Lumbar'
  },
  H: {
    bg: '#2960C3',
    label: 'Hombro'
  },
  N: {
    bg: '#7B6AE2',
    label: 'Neuro'
  }
};
function ProgramDot({
  p
}) {
  const t = PROG_TONE[p] || PROG_TONE.C;
  return /*#__PURE__*/React.createElement("span", {
    className: "dvr-progdot",
    title: t.label,
    style: {
      background: t.bg
    }
  }, p);
}
function SessionRow({
  s,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "dvr-sescard " + (active ? "is-active" : ""),
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-sescard__name"
  }, s.name), /*#__PURE__*/React.createElement("span", {
    className: "dvr-sescard__progs"
  }, s.programs.map(p => /*#__PURE__*/React.createElement(ProgramDot, {
    key: p,
    p: p
  }))), /*#__PURE__*/React.createElement("svg", {
    className: "dvr-sescard__chev",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6"
  })));
}
function CrearSesiones() {
  const [q, setQ] = React.useState("");
  const [selectedId, setSelectedId] = React.useState('carquel');
  const filtered = SESIONES.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  const selected = SESIONES.find(s => s.id === selectedId);
  return /*#__PURE__*/React.createElement("section", {
    className: "dvr-page dvr-create"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-create__layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-create__left"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "dvr-page__title"
  }, "Sesiones personalizadas"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-search dvr-search--page"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    className: "dvr-search__icon"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.3-4.3"
  })), /*#__PURE__*/React.createElement("input", {
    className: "dvr-search__input",
    placeholder: "Buscar",
    value: q,
    onChange: e => setQ(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "dvr-search__filter",
    "aria-label": "Filters"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 7h16M7 12h10M10 17h4"
  })))), /*#__PURE__*/React.createElement("ul", {
    className: "dvr-seslist"
  }, filtered.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.id
  }, /*#__PURE__*/React.createElement(SessionRow, {
    s: s,
    active: s.id === selectedId,
    onClick: () => setSelectedId(s.id)
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-create__right"
  }, selected && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "dvr-detail-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dvr-detail-head__name"
  }, selected.name), /*#__PURE__*/React.createElement("div", {
    className: "dvr-detail-head__kicker"
  }, "Tarea")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-close"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6l-12 12"
  })), "Cerrar")), selected.tareas ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "dvr-tarea-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-tarea-table__head"
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null, "Programa"), /*#__PURE__*/React.createElement("div", null, "Objetivo"), /*#__PURE__*/React.createElement("div", null, "Nivel"), /*#__PURE__*/React.createElement("div", null, "Duraci\xF3n")), selected.tareas.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "dvr-tarea-table__row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-tarea-table__name"
  }, t.name), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ProgramDot, {
    p: t.prog
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "dvr-link",
    onClick: e => e.preventDefault()
  }, t.goal)), /*#__PURE__*/React.createElement("div", {
    className: "dvr-tarea-table__num numeric"
  }, t.lvl), /*#__PURE__*/React.createElement("div", {
    className: "dvr-tarea-table__num numeric"
  }, t.dur)))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-tarea-total"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tarea-total__lbl"
  }, "Duraci\xF3n total:"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tarea-total__val"
  }, selected.total)), /*#__PURE__*/React.createElement("div", {
    className: "dvr-detail-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md dvr-btn--wide-sm"
  }, "Editar"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--destructive dvr-btn--md dvr-btn--wide-sm"
  }, "Eliminar sesi\xF3n"))) : /*#__PURE__*/React.createElement("div", {
    className: "dvr-detail-empty"
  }, "Selecciona una sesi\xF3n para ver sus tareas.")))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-page__cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--lg dvr-btn--wide"
  }, "Crear nueva sesi\xF3n")));
}
Object.assign(window, {
  CrearSesiones,
  SESIONES,
  ProgramDot
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/dynamics-platform/CrearSesiones.jsx", error: String((e && e.message) || e) }); }

// prototypes/dynamics-platform/Home.jsx
try { (() => {
/* eslint-disable */
/* Dynamics Platform UI kit — Home (Inicio) screen.
   Quick action cards + Últimas sesiones realizadas + Listado de invitaciones (tabs). */

function HomeIcon({
  name
}) {
  const m = {
    newPatient: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "10",
      cy: "9",
      r: "3.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 20c0-3.3 3-6 7-6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17",
      cy: "16",
      r: "3.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17 14v4M15 16h4"
    })),
    streaming: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16.5 7.5a6 6 0 0 1 0 9M7.5 7.5a6 6 0 0 0 0 9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.5 4.5a10 10 0 0 1 0 15M4.5 4.5a10 10 0 0 0 0 15"
    })),
    manual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 4h10a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 17a3 3 0 0 1 3-3h10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 8h6M8 12h6"
    })),
    sessions: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "5",
      width: "18",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 10h18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 3v4M16 3v4"
    })),
    help: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.7.6-1.7 1-1.7 2.2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "17",
      r: "0.6",
      fill: "currentColor"
    })),
    chev: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6"
    })),
    user: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "9",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 20c0-3.3 3-6 7-6s7 2.7 7 6"
    })),
    mail: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "6",
      width: "18",
      height: "13",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 8l9 7 9-7"
    }))
  };
  return m[name];
}
function Home() {
  const lastSessions = [{
    name: "test",
    date: "2025-05-06"
  }, {
    name: "Evaris",
    date: "2025-04-21"
  }, {
    name: "testPatient",
    date: "2025-04-08"
  }];
  const [invTab, setInvTab] = React.useState("pending");
  return /*#__PURE__*/React.createElement("section", {
    className: "dvr-page dvr-home"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quickrow"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-quick dvr-quick--blue"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__icon"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "newPatient"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__title"
  }, "Nuevo paciente"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__sub"
  }, "Registra a tu paciente"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-quick__cta dvr-quick__cta--fill"
  }, "A\xF1adir"))), /*#__PURE__*/React.createElement("button", {
    className: "dvr-quick dvr-quick--blue"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__icon"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "streaming"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__title"
  }, "Streaming"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__sub"
  }, "Ve la sesi\xF3n en streaming"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-quick__cta dvr-quick__cta--fill"
  }, "Ir a streaming"))), /*#__PURE__*/React.createElement("button", {
    className: "dvr-quick dvr-quick--ghost"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__icon dvr-quick__icon--soft"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "manual"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__title"
  }, "Manual terap\xE9utico"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-quick__sub"
  }, "Programas terap\xE9uticos"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-quick__cta dvr-quick__cta--outline"
  }, "Saber m\xE1s ", /*#__PURE__*/React.createElement(HomeIcon, {
    name: "chev"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-quickside"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-quickstat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quickstat__icon"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "sessions"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quickstat__title"
  }, "Totalidad de sesiones"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-quickstat__sub"
  }, "25 sesiones realizadas"))), /*#__PURE__*/React.createElement("button", {
    className: "dvr-quickstat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quickstat__icon"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "help"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dvr-quickstat__title"
  }, "\xBFTienes alguna duda?"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-quickstat__sub"
  }, "Abrir pesta\xF1a de ayuda ", /*#__PURE__*/React.createElement(HomeIcon, {
    name: "chev"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-twocol"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-panel"
  }, /*#__PURE__*/React.createElement("header", {
    className: "dvr-panel__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-panel__title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-panel__icon"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "user"
  })), /*#__PURE__*/React.createElement("span", null, "\xDAltimas sesiones realizadas")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-panel__more"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "chev"
  }))), /*#__PURE__*/React.createElement("ul", {
    className: "dvr-panel__list"
  }, lastSessions.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "dvr-panel__row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-pat-bubble"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "user"
  })), /*#__PURE__*/React.createElement("span", {
    className: "dvr-panel__name"
  }, s.name), /*#__PURE__*/React.createElement("span", {
    className: "dvr-panel__date numeric"
  }, s.date), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "dvr-panel__action",
    onClick: e => e.preventDefault()
  }, "+ INFO"))))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-panel"
  }, /*#__PURE__*/React.createElement("header", {
    className: "dvr-panel__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-panel__title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-panel__icon"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "mail"
  })), /*#__PURE__*/React.createElement("span", null, "Listado de invitaciones")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-panel__more"
  }, /*#__PURE__*/React.createElement(HomeIcon, {
    name: "chev"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-tabs dvr-tabs--inset"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (invTab === "pending" ? "is-on" : ""),
    onClick: () => setInvTab("pending")
  }, "Pendientes"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (invTab === "expired" ? "is-on" : ""),
    onClick: () => setInvTab("expired")
  }, "Caducadas"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (invTab === "done" ? "is-on" : ""),
    onClick: () => setInvTab("done")
  }, "Completadas")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-panel__empty"
  }, invTab === "pending" && "No hay invitaciones pendientes", invTab === "expired" && "No hay invitaciones caducadas", invTab === "done" && "No hay invitaciones completadas"))));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/dynamics-platform/Home.jsx", error: String((e && e.message) || e) }); }

// prototypes/dynamics-platform/PatientList.jsx
try { (() => {
/* eslint-disable */
/* Dynamics Platform UI kit — Patient list (table view).
   Matches the canonical "Listado de pacientes" screen:
   tabs → search → table → floating "Nuevo paciente" CTA. */

const PATIENTS = [{
  id: "test",
  name: "test",
  sub: "karol test",
  last: "2025-05-06",
  sessions: 12,
  active: true
}, {
  id: "testPatient",
  name: "testPatient",
  sub: "test Patient",
  last: "2025-04-08",
  sessions: 11,
  active: true
}, {
  id: "DanGar",
  name: "DanGar",
  sub: "Daniel Garrido",
  last: "—",
  sessions: 0,
  active: true
}, {
  id: "EstibLCA",
  name: "EstibLCA",
  sub: "Estíbaliz LCA",
  last: "—",
  sessions: 0,
  active: true
}, {
  id: "MigAng",
  name: "MigAng",
  sub: "Miguel Ángel",
  last: "—",
  sessions: 0,
  active: true
}, {
  id: "FranDafa",
  name: "FranDafa",
  sub: "Francisco Dafauce",
  last: "—",
  sessions: 0,
  active: true
}, {
  id: "ElenaMar",
  name: "ElenaMar",
  sub: "Elena Marín García",
  last: "2025-05-19",
  sessions: 24,
  active: true
}, {
  id: "JaviOrt",
  name: "JaviOrt",
  sub: "Javier Ortiz Roca",
  last: "2025-05-12",
  sessions: 18,
  active: true
}];
const UserBubble = () => /*#__PURE__*/React.createElement("div", {
  className: "dvr-pat-bubble"
}, /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "9",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 20c0-3.3 3-6 7-6s7 2.7 7 6"
})));
function Toggle({
  on,
  onChange
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "dvr-toggle " + (on ? "is-on" : ""),
    role: "switch",
    "aria-checked": on,
    onClick: onChange
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-toggle__thumb"
  }));
}
function PatientList() {
  const [tab, setTab] = React.useState("active");
  const [q, setQ] = React.useState("");
  const [rows, setRows] = React.useState(PATIENTS);
  const filtered = rows.filter(p => q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.sub.toLowerCase().includes(q.toLowerCase()));
  const toggleActive = id => {
    setRows(rs => rs.map(r => r.id === id ? {
      ...r,
      active: !r.active
    } : r));
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "dvr-page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "dvr-page__head"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "dvr-page__title"
  }, "Listado de pacientes")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (tab === "active" ? "is-on" : ""),
    onClick: () => setTab("active")
  }, "Tratamientos activos"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (tab === "inactive" ? "is-on" : ""),
    onClick: () => setTab("inactive")
  }, "Tratamientos inactivos")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-search dvr-search--page"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    className: "dvr-search__icon"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.3-4.3"
  })), /*#__PURE__*/React.createElement("input", {
    className: "dvr-search__input",
    placeholder: "Buscar",
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__head"
  }, /*#__PURE__*/React.createElement("div", null, "Informaci\xF3n del paciente"), /*#__PURE__*/React.createElement("div", null, "\xDAlt. Sesi\xF3n"), /*#__PURE__*/React.createElement("div", null, "Sesiones hechas"), /*#__PURE__*/React.createElement("div", null, "Programas terap\xE9uticos"), /*#__PURE__*/React.createElement("div", null, "Desactivar"), /*#__PURE__*/React.createElement("div", null, "Ver resultados")), /*#__PURE__*/React.createElement("ul", {
    className: "dvr-table__body"
  }, filtered.map(p => /*#__PURE__*/React.createElement("li", {
    key: p.id,
    className: "dvr-table__row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell dvr-table__cell--info"
  }, /*#__PURE__*/React.createElement(UserBubble, null), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__names"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__name"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__sub"
  }, p.sub))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell dvr-table__cell--date numeric"
  }, p.last), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell numeric"
  }, p.sessions, " sesiones"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--pill"
  }, "Gestionar actividades")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell"
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: p.active,
    onChange: () => toggleActive(p.id)
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "dvr-link",
    onClick: e => e.preventDefault()
  }, "Ver resultados")))))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-page__cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--lg dvr-btn--wide"
  }, "Nuevo paciente")));
}
Object.assign(window, {
  PatientList,
  PATIENTS,
  Toggle
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/dynamics-platform/PatientList.jsx", error: String((e && e.message) || e) }); }

// prototypes/dynamics-platform/Sidebar.jsx
try { (() => {
/* eslint-disable */
/* Dynamics Platform UI kit — Sidebar.
   Persistent clinician navigation rail with brand lockup, user profile card, nav, footer. */

const NavIcon = ({
  name
}) => {
  const icons = {
    home: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 12l9-9 9 9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 10v10h14V10"
    })),
    patients: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "8",
      cy: "9",
      r: "3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17",
      cy: "9",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M2 20c0-3 2.7-5 6-5s6 2 6 5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13 20c0-3 2.7-5 6-5"
    })),
    create: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 8v8M8 12h8"
    })),
    academy: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 7h18v12H3z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 7l9-4 9 4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 12h8"
    })),
    streaming: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16.5 7.5a6 6 0 0 1 0 9M7.5 7.5a6 6 0 0 0 0 9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.5 4.5a10 10 0 0 1 0 15M4.5 4.5a10 10 0 0 0 0 15"
    })),
    logout: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 17l5-5-5-5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 12H9"
    }))
  };
  return icons[name] || null;
};
function Sidebar({
  active,
  onNav,
  user = {
    name: "Karol Garcia",
    role: "Profesional"
  }
}) {
  const items = [{
    id: 'home',
    label: 'Inicio'
  }, {
    id: 'patients',
    label: 'Pacientes'
  }, {
    id: 'create',
    label: 'Crear sesiones'
  }, {
    id: 'academy',
    label: 'Academy'
  }, {
    id: 'streaming',
    label: 'Streaming'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "dvr-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-sidebar__brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-tagline-positivo.png",
    alt: "Dynamics \u2014 Empowering Active Healing"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-sidebar__profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-sidebar__avatar"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-sidebar__name"
  }, user.name), /*#__PURE__*/React.createElement("div", {
    className: "dvr-sidebar__role"
  }, user.role)), /*#__PURE__*/React.createElement("nav", {
    className: "dvr-sidebar__nav"
  }, items.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    className: "dvr-nav-item" + (active === item.id ? " is-active" : ""),
    onClick: () => onNav?.(item.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__icon"
  }, /*#__PURE__*/React.createElement(NavIcon, {
    name: item.id
  })), /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__label"
  }, item.label)))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-sidebar__foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-nav-item dvr-nav-item--muted"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__icon"
  }, /*#__PURE__*/React.createElement(NavIcon, {
    name: "logout"
  })), /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__label"
  }, "Desconectar"))));
}
window.Sidebar = Sidebar;
window.NavIcon = NavIcon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/dynamics-platform/Sidebar.jsx", error: String((e && e.message) || e) }); }

// prototypes/dynamics-platform/Streaming.jsx
try { (() => {
/* eslint-disable */
/* Dynamics Platform UI kit — Streaming intro screen.
   Centred heading, two-column checklist, two choice cards. */

function StreamIcon({
  name
}) {
  const m = {
    pos: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "9",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"
    })),
    wifi: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2 8.5a16 16 0 0 1 20 0"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 12a12 12 0 0 1 14 0"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8.5 15.5a7 7 0 0 1 7 0"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "19",
      r: "1",
      fill: "currentColor"
    })),
    enter: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 12h13"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7l5 5-5 5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 4v16"
    })),
    power: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 4v8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6.5 8a8 8 0 1 0 11 0"
    })),
    open: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 4h6v6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 4l-8 8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"
    })),
    tap: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 10V6a3 3 0 1 1 6 0v6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 10v6a4 4 0 0 0 4 4h2.5a4 4 0 0 0 4-4v-2.5a3 3 0 0 0-6 0"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "10",
      r: "1.5",
      fill: "currentColor"
    })),
    eye: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    })),
    pad: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "7",
      width: "20",
      height: "11",
      rx: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 11v3M5.5 12.5h3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "15.5",
      cy: "11.5",
      r: "0.8",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17.5",
      cy: "13.5",
      r: "0.8",
      fill: "currentColor"
    }))
  };
  return m[name];
}
function Step({
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dvr-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-step__icon"
  }, /*#__PURE__*/React.createElement(StreamIcon, {
    name: icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-step__txt"
  }, children));
}
function Streaming() {
  return /*#__PURE__*/React.createElement("section", {
    className: "dvr-page dvr-stream"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "dvr-stream__h"
  }, "Inicia la transmisi\xF3n en directo de tu paciente"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-stream__section"
  }, /*#__PURE__*/React.createElement("p", {
    className: "dvr-stream__lbl"
  }, "Antes de comenzar:"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-stream__steps"
  }, /*#__PURE__*/React.createElement(Step, {
    icon: "pos"
  }, "Coloca al paciente en una posici\xF3n c\xF3moda y segura"), /*#__PURE__*/React.createElement(Step, {
    icon: "power"
  }, "Enciende el dispositivo"), /*#__PURE__*/React.createElement(Step, {
    icon: "wifi"
  }, "Aseg\xFArate de usar la misma red wifi tanto en el dispositivo VR como en la tablet/ordenador"), /*#__PURE__*/React.createElement(Step, {
    icon: "open"
  }, "Abre la app ", /*#__PURE__*/React.createElement("strong", null, "DynamicsVR App"), " en dispositivo VR"), /*#__PURE__*/React.createElement(Step, {
    icon: "enter"
  }, "Inicia sesi\xF3n en ", /*#__PURE__*/React.createElement("strong", null, "DynamicsVR App")), /*#__PURE__*/React.createElement(Step, {
    icon: "tap"
  }, "Selecciona un paciente"))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-stream__section"
  }, /*#__PURE__*/React.createElement("p", {
    className: "dvr-stream__lbl dvr-stream__lbl--center"
  }, "Elige c\xF3mo quieres conectarte:"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-stream__choices"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-choice dvr-choice--muted"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-choice__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-choice__icon dvr-choice__icon--gray"
  }, /*#__PURE__*/React.createElement(StreamIcon, {
    name: "eye"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-choice__title"
  }, "Visualizar sesi\xF3n")), /*#__PURE__*/React.createElement("p", {
    className: "dvr-choice__copy"
  }, "Con\xE9ctate para observar una sesi\xF3n ya iniciada en VR."), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--lg dvr-choice__cta dvr-choice__cta--gray"
  }, "Conectar como observador")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-choice"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-choice__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-choice__icon dvr-choice__icon--blue"
  }, /*#__PURE__*/React.createElement(StreamIcon, {
    name: "pad"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dvr-choice__title"
  }, "Iniciar y controlar sesi\xF3n")), /*#__PURE__*/React.createElement("p", {
    className: "dvr-choice__copy"
  }, "Inicia una sesi\xF3n nueva y gestiona la experiencia del paciente."), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--lg dvr-choice__cta"
  }, "Iniciar sesi\xF3n")))));
}
Object.assign(window, {
  Streaming
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/dynamics-platform/Streaming.jsx", error: String((e && e.message) || e) }); }

// prototypes/dynamics-platform/Topbar.jsx
try { (() => {
/* eslint-disable */
/* Dynamics Platform UI kit — Topbar.
   Slim header with right-aligned notifications and language pill. */

function Topbar({
  notifications = 4,
  locale = "Español",
  flag = "🇪🇸"
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "dvr-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-topbar__spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "dvr-topbar__actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-bell",
    "aria-label": "Notifications"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })), notifications > 0 && /*#__PURE__*/React.createElement("span", {
    className: "dvr-bell__count"
  }, notifications)), /*#__PURE__*/React.createElement("button", {
    className: "dvr-locale"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-locale__flag",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#C60B1E',
      display: 'block',
      height: 6
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#FFC400',
      display: 'block',
      height: 8
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#C60B1E',
      display: 'block',
      height: 6
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "dvr-locale__label"
  }, locale), /*#__PURE__*/React.createElement("svg", {
    className: "dvr-locale__chev",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  })))));
}
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/dynamics-platform/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Alerts.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Alerts & Toasts. */

function CloseGlyph() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6l-12 12"
  }));
}
function AlertsDemo() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Inline alerts ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-alert")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert dvr-alert--success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__icon"
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__title"
  }, "Sesi\xF3n guardada"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__text"
  }, "La evaluaci\xF3n de Elena Mar\xEDn se ha a\xF1adido a su historial.")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-alert__close",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(CloseGlyph, null))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert dvr-alert--warning"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__icon"
  }, "!"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__title"
  }, "Revisi\xF3n pendiente"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__text"
  }, "3 sesiones necesitan firma del cl\xEDnico antes del informe semanal.")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-alert__close",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(CloseGlyph, null))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert dvr-alert--error"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__icon"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__title"
  }, "Visor desconectado"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__text"
  }, "Sesi\xF3n VR en pausa \u2014 reconecta el dispositivo en 60 s para conservar el progreso.")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-alert__close",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(CloseGlyph, null))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert dvr-alert--info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__icon"
  }, "i"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__title"
  }, "Nuevo benchmark de ROM"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-alert__text"
  }, "Compara el progreso del paciente con el conjunto cervical de referencia actualizado.")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-alert__close",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(CloseGlyph, null))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Toasts ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-toast")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo kit__on-section",
    style: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast dvr-toast--ok"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__icon"
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__title"
  }, "Cambios guardados"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__text"
  }, "Sincronizados hace un instante"))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast dvr-toast--err"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__icon"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__title"
  }, "No se pudo guardar"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__text"
  }, "Revisa la conexi\xF3n e int\xE9ntalo de nuevo"))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast dvr-toast--info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__icon"
  }, "i"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__title"
  }, "Nueva sesi\xF3n asignada"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-toast__text"
  }, "Cervical \xB7 14:30 con Carlos M."))))));
}
window.AlertsDemo = AlertsDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Alerts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Buttons.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Buttons & links. */

function Icon({
  name
}) {
  const m = {
    plus: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })),
    play: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor",
      stroke: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 5l11 7-11 7V5z"
    })),
    chev: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6"
    })),
    chevL: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M15 6l-6 6 6 6"
    })),
    save: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17 21v-8H7v8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 3v5h8"
    })),
    trash: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
    })),
    download: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3v14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 12l7 7 7-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 21h14"
    })),
    filter: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 7h16M7 12h10M10 17h4"
    })),
    ext: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 4h6v6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 4l-8 8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"
    })),
    more: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "5",
      cy: "12",
      r: "1.6",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1.6",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "19",
      cy: "12",
      r: "1.6",
      fill: "currentColor"
    })),
    pencil: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 20h9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z"
    }))
  };
  return /*#__PURE__*/React.createElement("span", {
    className: "dvr-btn__icon"
  }, m[name]);
}
window.KitIcon = Icon;
function ButtonsDemo() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Variants ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-btn--primary \xB7 --outline \xB7 --outline-gray \xB7 --ghost \xB7 --destructive")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Default"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md"
  }, "Primary"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--md"
  }, "Outline"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline-gray dvr-btn--md"
  }, "Outline gray"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--ghost dvr-btn--md"
  }, "Ghost"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--destructive dvr-btn--md"
  }, "Destructive")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Disabled"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md",
    disabled: true
  }, "Primary"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--md",
    disabled: true
  }, "Outline"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline-gray dvr-btn--md",
    disabled: true
  }, "Outline gray"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--ghost dvr-btn--md",
    disabled: true
  }, "Ghost"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--destructive dvr-btn--md",
    disabled: true
  }, "Destructive")))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Sizes ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-btn--xs \xB7 --sm \xB7 --md \xB7 --lg \xB7 --xl")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "XS \xB7 28px"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--xs"
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--xs"
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "SM \xB7 32px"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--sm"
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--sm"
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "MD \xB7 40px"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md"
  }, "Save changes"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--md"
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "LG \xB7 48px"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--lg"
  }, "Save changes"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--lg"
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "XL \xB7 52px"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--xl"
  }, "Crear nueva sesi\xF3n")))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "With icons"), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Left icon"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), "Nuevo paciente"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--md"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download"
  }), "Exportar"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--destructive dvr-btn--md"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash"
  }), "Eliminar sesi\xF3n")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Right icon"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md"
  }, "Continuar", /*#__PURE__*/React.createElement(Icon, {
    name: "chev"
  })), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--md"
  }, "Saber m\xE1s", /*#__PURE__*/React.createElement(Icon, {
    name: "chev"
  })), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--ghost dvr-btn--md"
  }, "Abrir", /*#__PURE__*/React.createElement(Icon, {
    name: "ext"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Icon only"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md dvr-btn--icon-only",
    "aria-label": "Add"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  })), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--md dvr-btn--icon-only",
    "aria-label": "Edit"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pencil"
  })), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline-gray dvr-btn--md dvr-btn--icon-only",
    "aria-label": "More"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more"
  })), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--ghost dvr-btn--md dvr-btn--icon-only",
    "aria-label": "Filter"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "filter"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Shapes & link"), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Pill"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md dvr-btn--pill"
  }, "Gestionar actividades"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--md dvr-btn--pill"
  }, "Filtros")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Link"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "dvr-link",
    onClick: e => e.preventDefault()
  }, "Ver resultados"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "dvr-link",
    onClick: e => e.preventDefault()
  }, "+ INFO"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "dvr-link",
    onClick: e => e.preventDefault()
  }, "Saber m\xE1s")))));
}
window.ButtonsDemo = ButtonsDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Buttons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Cards.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Cards & Empty state. */

function CardsDemo() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Card variants ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-card \xB7 --flat \xB7 --raised")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo kit__on-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-grid kit__demo-grid--3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 600
    }
  }, "Default card"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--fg-heading)',
      marginTop: 6
    }
  }, "Box shadow \xB7 subtle"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      marginTop: 8,
      lineHeight: 1.45
    }
  }, "Most surfaces use this. Sits comfortably on the page section background.")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-card dvr-card--flat"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 600
    }
  }, "Flat card"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--fg-heading)',
      marginTop: 6
    }
  }, "No shadow"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      marginTop: 8,
      lineHeight: 1.45
    }
  }, "For nested containers and rows inside a parent card.")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-card dvr-card--raised"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 600
    }
  }, "Raised card"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--fg-heading)',
      marginTop: 6
    }
  }, "Higher elevation"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      marginTop: 8,
      lineHeight: 1.45
    }
  }, "Use for floating elements and prominent calls to attention."))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Compositions \u2014 patient and session card"), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo kit__on-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-grid kit__demo-grid--2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-card",
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-avatar dvr-avatar--lg"
  }, "EM"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--fg-heading)'
    }
  }, "Elena Mar\xEDn Garc\xEDa"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      fontFamily: 'var(--font-mono)'
    }
  }, "PAT-204812 \xB7 56 y \xB7 Cervical")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md dvr-btn--icon-only",
    style: {
      borderRadius: '50%',
      border: '2px solid #2B3674'
    },
    "aria-label": "Start"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5l11 7-11 7V5z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-card",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#2960C3',
      fontWeight: 600
    }
  }, "HOMBRO \xB7 SESI\xD3N 14 / 24"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--ok"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot"
  }), "En progreso")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--fg-heading)'
    }
  }, "Rotaci\xF3n derecha \u2014 intensidad media"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__fill",
    style: {
      width: '58%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "ROM ", /*#__PURE__*/React.createElement("b", {
    className: "numeric",
    style: {
      color: 'var(--fg-heading)',
      fontWeight: 600
    }
  }, "87\xB0")), /*#__PURE__*/React.createElement("span", null, "Pr\xF3xima \xB7 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)',
      fontWeight: 600
    }
  }, "Ma\xF1ana 09:30"))))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Empty state ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-empty")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo kit__on-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-empty__art"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.3-4.3"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-empty__title"
  }, "Sin resultados"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-empty__sub"
  }, "No se han encontrado pacientes que coincidan con tu b\xFAsqueda. Prueba con otro t\xE9rmino o limpia los filtros."), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--sm"
  }, "Limpiar filtros")))));
}
window.CardsDemo = CardsDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Cards.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Inputs.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Inputs & form controls. */

function InputsDemo() {
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("32 / 13 / 1980");
  const [text3, setText3] = React.useState("Hospital Quirón · Madrid");
  const [check, setCheck] = React.useState({
    a: true,
    b: false,
    c: true
  });
  const [radio, setRadio] = React.useState("activos");
  const [toggle, setToggle] = React.useState({
    a: true,
    b: false
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Text input \xB7 states ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-input")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-grid kit__demo-grid--2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "dvr-field__label"
  }, "ID del paciente"), /*#__PURE__*/React.createElement("input", {
    className: "dvr-input",
    placeholder: "e.g. PAT-204812",
    value: text1,
    onChange: e => setText1(e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-field__hint"
  }, "Se utiliza en sesiones y exportaciones")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "dvr-field__label"
  }, "Email del paciente"), /*#__PURE__*/React.createElement("input", {
    className: "dvr-input",
    placeholder: "paciente@email.com"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-field__hint"
  }, "Las notificaciones se env\xEDan a este correo")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "dvr-field__label"
  }, "Fecha de nacimiento"), /*#__PURE__*/React.createElement("input", {
    className: "dvr-input is-error",
    value: text2,
    onChange: e => setText2(e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-field__error"
  }, "Introduce una fecha v\xE1lida \u2014 DD / MM / AAAA")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "dvr-field__label"
  }, "Centro cl\xEDnico"), /*#__PURE__*/React.createElement("input", {
    className: "dvr-input is-disabled",
    value: text3,
    disabled: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-field__hint"
  }, "Vinculado a tu cuenta"))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Search ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-search")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-search"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    className: "dvr-search__icon"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.3-4.3"
  })), /*#__PURE__*/React.createElement("input", {
    className: "dvr-search__input",
    placeholder: "Buscar pacientes\u2026"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-search"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    className: "dvr-search__icon"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.3-4.3"
  })), /*#__PURE__*/React.createElement("input", {
    className: "dvr-search__input",
    placeholder: "Buscar"
  }), /*#__PURE__*/React.createElement("button", {
    className: "dvr-search__filter",
    "aria-label": "Filters"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 7h16M7 12h10M10 17h4"
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Textarea"), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "dvr-field__label"
  }, "Notas cl\xEDnicas"), /*#__PURE__*/React.createElement("textarea", {
    className: "dvr-textarea",
    placeholder: "Escribe una nota para la sesi\xF3n\u2026"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-field__hint"
  }, "Visible para el equipo asignado al paciente")))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Checkbox & radio"), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Checkbox"), /*#__PURE__*/React.createElement("label", {
    className: "dvr-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: check.a,
    onChange: () => setCheck(c => ({
      ...c,
      a: !c.a
    }))
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-check__box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 7"
  }))), "Aceptar t\xE9rminos"), /*#__PURE__*/React.createElement("label", {
    className: "dvr-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: check.b,
    onChange: () => setCheck(c => ({
      ...c,
      b: !c.b
    }))
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-check__box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 7"
  }))), "Recibir res\xFAmenes semanales"), /*#__PURE__*/React.createElement("label", {
    className: "dvr-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: true,
    disabled: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-check__box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 7"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-disabled)'
    }
  }, "Bloqueado por administrador"))), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Radio"), /*#__PURE__*/React.createElement("label", {
    className: "dvr-radio"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "grp",
    checked: radio === "activos",
    onChange: () => setRadio("activos")
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-radio__dot"
  }), "Tratamientos activos"), /*#__PURE__*/React.createElement("label", {
    className: "dvr-radio"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "grp",
    checked: radio === "inactivos",
    onChange: () => setRadio("inactivos")
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-radio__dot"
  }), "Inactivos"), /*#__PURE__*/React.createElement("label", {
    className: "dvr-radio"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "grp",
    checked: radio === "todos",
    onChange: () => setRadio("todos")
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-radio__dot"
  }), "Todos")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Toggle"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-toggle " + (toggle.a ? "is-on" : ""),
    onClick: () => setToggle(t => ({
      ...t,
      a: !t.a
    }))
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-toggle__thumb"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-primary)'
    }
  }, "Tratamiento activo"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "dvr-toggle " + (toggle.b ? "is-on" : ""),
    onClick: () => setToggle(t => ({
      ...t,
      b: !t.b
    }))
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-toggle__thumb"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-primary)'
    }
  }, "Notificaciones por email")))));
}
window.InputsDemo = InputsDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Inputs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Misc.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Avatars, KPI tiles, progress bars. */

function UserGlyph() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 20c0-3.3 3-6 7-6s7 2.7 7 6"
  }));
}
function MiscDemo() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Avatars ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-avatar \xB7 .dvr-pat-bubble")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row",
    style: {
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Initials"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-avatar dvr-avatar--sm"
  }, "EM"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-avatar dvr-avatar--md"
  }, "EM"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-avatar dvr-avatar--lg"
  }, "EM"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-avatar dvr-avatar--xl"
  }, "EM")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row",
    style: {
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Outline"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-avatar dvr-avatar--md dvr-avatar--outline"
  }, /*#__PURE__*/React.createElement(UserGlyph, null)), /*#__PURE__*/React.createElement("span", {
    className: "dvr-avatar dvr-avatar--lg dvr-avatar--outline"
  }, /*#__PURE__*/React.createElement(UserGlyph, null)), /*#__PURE__*/React.createElement("span", {
    className: "dvr-avatar dvr-avatar--xl dvr-avatar--outline"
  }, /*#__PURE__*/React.createElement(UserGlyph, null))), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit__state-lbl"
  }, "Bubble"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-pat-bubble"
  }, /*#__PURE__*/React.createElement(UserGlyph, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)'
    }
  }, "Lighter weight, used in row-density lists (\xDAltimas sesiones, Listado de pacientes).")))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "KPI tiles ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-kpi")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-grid kit__demo-grid--4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__icon",
    style: {
      background: '#E9EDFF',
      color: '#2F76F7'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 5a2 2 0 0 1 2-2h12v17H6a2 2 0 0 0-2 2V5z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__label"
  }, "En progreso"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__value numeric"
  }, "2"))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__icon",
    style: {
      background: '#D1FADF',
      color: '#12B76A'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "14",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 8L5 2h5l2 4 2-4h5l-3 6"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__label"
  }, "Completados"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__value numeric"
  }, "4"))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__icon",
    style: {
      background: '#ECE9FB',
      color: '#7B6AE2'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__label"
  }, "Minutos"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__value numeric"
  }, "145"))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__icon",
    style: {
      background: '#FFF1E1',
      color: '#F3A257'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.6",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__label"
  }, "Racha"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-kpi__value numeric"
  }, "7d")))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Progress bars ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-progress")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-grid kit__demo-grid--2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__head"
  }, /*#__PURE__*/React.createElement("span", null, "Adherencia \xB7 30 d\xEDas"), /*#__PURE__*/React.createElement("b", {
    className: "numeric"
  }, "88%")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__fill",
    style: {
      width: '88%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__head"
  }, /*#__PURE__*/React.createElement("span", null, "Sesiones realizadas"), /*#__PURE__*/React.createElement("b", {
    className: "numeric"
  }, "14 / 24")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__fill dvr-progress__fill--ok",
    style: {
      width: '58%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__head"
  }, /*#__PURE__*/React.createElement("span", null, "Asistencia esta semana"), /*#__PURE__*/React.createElement("b", {
    className: "numeric"
  }, "41%")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__track dvr-progress__track--thick"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__fill dvr-progress__fill--err",
    style: {
      width: '41%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__head"
  }, /*#__PURE__*/React.createElement("span", null, "Almacenamiento"), /*#__PURE__*/React.createElement("b", {
    className: "numeric"
  }, "73%")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__track dvr-progress__track--thick"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-progress__fill dvr-progress__fill--warn",
    style: {
      width: '73%'
    }
  })))))));
}
window.MiscDemo = MiscDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Misc.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Overlays.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Modal, Tooltip, Pagination, Nav item. */

function CloseGlyph() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6l-12 12"
  }));
}
function ConfirmDialog({
  eyebrow,
  title,
  body,
  cancelLabel = "Cancelar",
  confirmLabel,
  destructive,
  onCancel,
  onConfirm
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dvr-modal-wrap"
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "dvr-modal-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-modal-eyebrow__dot"
  }), eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "dvr-modal"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-modal__close",
    "aria-label": "Cerrar",
    onClick: onCancel
  }, /*#__PURE__*/React.createElement(CloseGlyph, null)), /*#__PURE__*/React.createElement("h2", {
    className: "dvr-modal__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "dvr-modal__body"
  }, body), /*#__PURE__*/React.createElement("div", {
    className: "dvr-modal__sep"
  }), /*#__PURE__*/React.createElement("div", {
    className: "dvr-modal__foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline",
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn " + (destructive ? "dvr-btn--destructive" : "dvr-btn--primary"),
    onClick: onConfirm
  }, confirmLabel))));
}
function OverlaysDemo() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(2);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Confirm dialog ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-modal")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--primary dvr-btn--md",
    onClick: () => setOpen(true)
  }, "Abrir modal de ejemplo"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      maxWidth: 520
    }
  }, "Di\xE1logos que requieren atenci\xF3n y acci\xF3n del usuario antes de proceder. T\xEDtulo en forma de pregunta, descripci\xF3n centrada con consecuencias, separador y dos botones del mismo ancho.")), /*#__PURE__*/React.createElement("div", {
    className: "kit__on-section",
    style: {
      padding: 32,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
      gap: 24,
      justifyItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(ConfirmDialog, {
    eyebrow: "Modificaci\xF3n tarea actual",
    title: "\xBFConfirmar cambios?",
    body: "Est\xE1s a punto de modificar la tarea actual. Al aplicar los cambios, se actualizar\xE1n los par\xE1metros, y la tarea se reiniciar\xE1.",
    confirmLabel: "Guardar cambios"
  }), /*#__PURE__*/React.createElement(ConfirmDialog, {
    eyebrow: "Streaming \u2014 Salir",
    title: "\xBFSalir del streaming?",
    body: "La sesi\xF3n seguir\xE1 en curso. Podr\xE1s reanudar el streaming m\xE1s tarde sin perder el progreso del paciente.",
    confirmLabel: "Salir",
    destructive: true
  }), /*#__PURE__*/React.createElement(ConfirmDialog, {
    eyebrow: "Modificaci\xF3n duraci\xF3n",
    title: "\xBFReiniciar tarea?",
    body: "Se perder\xE1 todo el progreso actual de esta tarea. Esta acci\xF3n no se puede deshacer.",
    confirmLabel: "Reiniciar",
    destructive: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "kit__on-section",
    style: {
      padding: 32,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-modal-wrap",
    style: {
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-modal dvr-modal--loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-modal__spinner"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "dvr-modal__title",
    style: {
      color: 'var(--dvr-blue-action)'
    }
  }, "Modificando tarea\u2026"), /*#__PURE__*/React.createElement("p", {
    className: "dvr-modal__body"
  }, "El streaming se reiniciar\xE1 aplicando los nuevos par\xE1metros."), /*#__PURE__*/React.createElement("button", {
    className: "dvr-modal__cancel-link"
  }, "Cancelar")))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      display: 'grid',
      gap: 6,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)'
    }
  }, "Eyebrow opcional"), " \u2014 chip indigo claro encima del modal que aporta contexto (qu\xE9 acci\xF3n se est\xE1 confirmando)."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)'
    }
  }, "T\xEDtulo"), " \u2014 pregunta directa, DM Sans 700, 17 px, color indigo profundo, centrado."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)'
    }
  }, "Descripci\xF3n"), " \u2014 DM Sans 500, 12 px, line-height 21 px, centrada. Explica consecuencias concretas."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)'
    }
  }, "Acciones"), " \u2014 dos botones del mismo ancho, separados 32 px. Cancelar siempre outline azul. Confirmar usa ", /*#__PURE__*/React.createElement("code", null, "--primary"), " o ", /*#__PURE__*/React.createElement("code", null, "--destructive"), " seg\xFAn la consecuencia."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)'
    }
  }, "Bot\xF3n X"), " \u2014 opcional, esquina superior derecha. Equivale a Cancelar."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)'
    }
  }, "Scrim"), " \u2014 ", /*#__PURE__*/React.createElement("code", null, "rgba(2,2,70,0.45)"), " (tono indigo, no negro puro)."))), open && /*#__PURE__*/React.createElement("div", {
    className: "dvr-modal-scrim",
    onClick: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(ConfirmDialog, {
    eyebrow: "Modificaci\xF3n tarea actual",
    title: "\xBFConfirmar cambios?",
    body: "Est\xE1s a punto de modificar la tarea actual. Al aplicar los cambios, se actualizar\xE1n los par\xE1metros, y la tarea se reiniciar\xE1.",
    confirmLabel: "Guardar cambios",
    onCancel: () => setOpen(false),
    onConfirm: () => setOpen(false)
  })))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Tooltip ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-tip")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo",
    style: {
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row",
    style: {
      justifyContent: 'space-around'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tip-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tip"
  }, "Adherencia 30 d\xEDas"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--sm dvr-btn--icon-only",
    style: {
      borderRadius: '50%'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.7.6-1.7 1-1.7 2.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "17",
    r: "0.6",
    fill: "currentColor"
  })))), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tip-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tip"
  }, "Eliminar \u2014 esta acci\xF3n es irreversible"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--destructive dvr-btn--sm dvr-btn--icon-only"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    width: "14",
    height: "14"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
  })))), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tip-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tip"
  }, "Cervical \xB7 Lumbar \xB7 Hombro"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-progdot dvr-progdot--C"
  }, "C"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-progdot dvr-progdot--L"
  }, "L"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-progdot dvr-progdot--H"
  }, "H")))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Pagination ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-pagination")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-pagination"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-pagination__btn",
    disabled: page === 1,
    onClick: () => setPage(p => Math.max(1, p - 1))
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 6l-6 6 6 6"
  }))), [1, 2, 3, 4].map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    className: "dvr-pagination__btn " + (page === n ? "is-on" : ""),
    onClick: () => setPage(n)
  }, n)), /*#__PURE__*/React.createElement("span", {
    className: "dvr-pagination__sep"
  }, "\u2026"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-pagination__btn " + (page === 12 ? "is-on" : ""),
    onClick: () => setPage(12)
  }, "12"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-pagination__btn",
    disabled: page === 12,
    onClick: () => setPage(p => Math.min(12, p + 1))
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6"
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      marginLeft: 16
    }
  }, "P\xE1gina ", page, " de 12 \xB7 248 pacientes")))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Sidebar nav items ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-nav-item")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-grid kit__demo-grid--2",
    style: {
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#FFFFFF',
      border: '1px solid var(--border-subtle)',
      borderRadius: 12,
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-nav-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 12l9-9 9 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 10v10h14V10"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__label"
  }, "Inicio")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-nav-item is-active"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "9",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "9",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 20c0-3 2.7-5 6-5s6 2 6 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 20c0-3 2.7-5 6-5"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__label"
  }, "Pacientes")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-nav-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v8M8 12h8"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__label"
  }, "Crear sesiones")), /*#__PURE__*/React.createElement("button", {
    className: "dvr-nav-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h18v12H3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 7l9-4 9 4"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "dvr-nav-item__label"
  }, "Academy"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      fontSize: 13,
      color: 'var(--fg-secondary)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)'
    }
  }, "Active state"), " \u2014 soft section-blue fill, blue text, 3px left bar accent."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)'
    }
  }, "Hover"), " \u2014 light section background, text moves to heading colour."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-heading)'
    }
  }, "Muted"), " \u2014 used for \"Desconectar\" and other low-priority actions; lighter grey tone."))))));
}
window.OverlaysDemo = OverlaysDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Overlays.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Selects.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Select / Dropdown menu. */

function SelectsDemo() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("cervical");
  const opts = [{
    id: 'cervical',
    label: 'Cervical'
  }, {
    id: 'lumbar',
    label: 'Lumbar'
  }, {
    id: 'hombro',
    label: 'Hombro'
  }, {
    id: 'neuro',
    label: 'Neuro-motor'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Select \xB7 trigger states ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-select")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-grid kit__demo-grid--3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "dvr-field__label"
  }, "Programa terap\xE9utico"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-select"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-select__trigger"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-select__placeholder"
  }, "Selecciona un programa\u2026"), /*#__PURE__*/React.createElement("svg", {
    className: "dvr-select__chev",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "dvr-field__label"
  }, "Programa terap\xE9utico"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-select"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-select__trigger",
    onClick: () => setOpen(o => !o)
  }, opts.find(o => o.id === selected)?.label, /*#__PURE__*/React.createElement("svg", {
    className: "dvr-select__chev",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), open && /*#__PURE__*/React.createElement("div", {
    className: "dvr-menu"
  }, opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    className: "dvr-menu__item " + (o.id === selected ? "is-selected" : ""),
    onClick: () => {
      setSelected(o.id);
      setOpen(false);
    }
  }, o.label))))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "dvr-field__label"
  }, "Centro cl\xEDnico"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-select"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-select__trigger",
    disabled: true,
    style: {
      background: 'var(--dvr-gray-100)',
      color: 'var(--fg-disabled)',
      cursor: 'not-allowed'
    }
  }, "Hospital Quir\xF3n \xB7 Madrid", /*#__PURE__*/React.createElement("svg", {
    className: "dvr-select__chev",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  })))))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Standalone menu"), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-menu",
    style: {
      position: 'static',
      maxWidth: 260,
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-menu__item"
  }, "Ver historial"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-menu__item is-selected"
  }, "Reasignar fisioterapeuta"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-menu__item"
  }, "Exportar informe"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-menu__item",
    style: {
      color: 'var(--dvr-text-error-dark)'
    }
  }, "Eliminar paciente"))))));
}
window.SelectsDemo = SelectsDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Selects.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Tables.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Tables. */

function TablesDemo() {
  const [rows, setRows] = React.useState([{
    id: "test",
    name: "test",
    sub: "karol test",
    date: "2025-05-06",
    sessions: 12,
    active: true
  }, {
    id: "testPatient",
    name: "testPatient",
    sub: "test Patient",
    date: "2025-04-08",
    sessions: 11,
    active: true
  }, {
    id: "DanGar",
    name: "DanGar",
    sub: "Daniel Garrido",
    date: "—",
    sessions: 0,
    active: false
  }, {
    id: "ElenaMar",
    name: "ElenaMar",
    sub: "Elena Marín García",
    date: "2025-05-19",
    sessions: 24,
    active: true
  }]);
  const toggle = id => setRows(rs => rs.map(r => r.id === id ? {
    ...r,
    active: !r.active
  } : r));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Patient list table ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-table")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo kit__on-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__head",
    style: {
      gridTemplateColumns: 'minmax(220px, 2fr) minmax(110px, 1fr) minmax(120px, 1fr) minmax(180px, 1.4fr) 100px 130px'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Informaci\xF3n del paciente"), /*#__PURE__*/React.createElement("div", null, "\xDAlt. Sesi\xF3n"), /*#__PURE__*/React.createElement("div", null, "Sesiones hechas"), /*#__PURE__*/React.createElement("div", null, "Programas terap\xE9uticos"), /*#__PURE__*/React.createElement("div", null, "Desactivar"), /*#__PURE__*/React.createElement("div", null, "Ver resultados")), rows.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: "dvr-table__row",
    style: {
      gridTemplateColumns: 'minmax(220px, 2fr) minmax(110px, 1fr) minmax(120px, 1fr) minmax(180px, 1.4fr) 100px 130px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell dvr-table__cell--info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-pat-bubble"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 20c0-3.3 3-6 7-6s7 2.7 7 6"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__names"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__name"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__sub"
  }, p.sub))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell numeric"
  }, p.date), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell numeric"
  }, p.sessions, " sesiones"), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-btn dvr-btn--outline dvr-btn--sm dvr-btn--pill"
  }, "Gestionar actividades")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-toggle " + (p.active ? "is-on" : ""),
    onClick: () => toggle(p.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-toggle__thumb"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "dvr-link",
    onClick: e => e.preventDefault()
  }, "Ver resultados"))))))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Task table \u2014 like inside *Crear sesiones*"), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo kit__on-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__head",
    style: {
      gridTemplateColumns: 'minmax(160px, 1.6fr) 90px minmax(140px, 1.2fr) 60px 80px'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Tarea"), /*#__PURE__*/React.createElement("div", null, "Programa"), /*#__PURE__*/React.createElement("div", null, "Objetivo"), /*#__PURE__*/React.createElement("div", null, "Nivel"), /*#__PURE__*/React.createElement("div", null, "Duraci\xF3n")), [{
    name: 'Velocidad de movimiento',
    p: 'N',
    goal: 'Ritmo Bongos',
    lvl: 5,
    dur: "2'"
  }, {
    name: 'Equilibrio',
    p: 'N',
    goal: 'Explota burbujas',
    lvl: 7,
    dur: "2'"
  }, {
    name: 'Motricidad fina',
    p: 'N',
    goal: 'Alimentos al plato',
    lvl: 6,
    dur: "2'"
  }, {
    name: 'Motricidad gruesa',
    p: 'N',
    goal: 'Pincel mágico',
    lvl: 7,
    dur: "2'"
  }].map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "dvr-table__row",
    style: {
      gridTemplateColumns: 'minmax(160px, 1.6fr) 90px minmax(140px, 1.2fr) 60px 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell",
    style: {
      fontWeight: 500,
      color: 'var(--fg-primary)'
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-progdot dvr-progdot--" + t.p
  }, t.p)), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "dvr-link",
    onClick: e => e.preventDefault()
  }, t.goal)), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell numeric",
    style: {
      fontStyle: 'italic'
    }
  }, t.lvl), /*#__PURE__*/React.createElement("div", {
    className: "dvr-table__cell numeric",
    style: {
      fontStyle: 'italic'
    }
  }, t.dur)))))));
}
window.TablesDemo = TablesDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Tables.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Tabs.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Tabs & Segmented control. */

function TabsDemo() {
  const [u, setU] = React.useState("activos");
  const [s, setS] = React.useState("30");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Underline tabs ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-tabs")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (u === "activos" ? "is-on" : ""),
    onClick: () => setU("activos")
  }, "Tratamientos activos"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (u === "inactivos" ? "is-on" : ""),
    onClick: () => setU("inactivos")
  }, "Tratamientos inactivos")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (u === "p" ? "is-on" : ""),
    onClick: () => setU("p")
  }, "Pendientes"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (u === "c" ? "is-on" : ""),
    onClick: () => setU("c")
  }, "Caducadas"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-tabs__opt " + (u === "d" ? "is-on" : ""),
    onClick: () => setU("d")
  }, "Completadas")))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Segmented control ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-segmented")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dvr-segmented"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-segmented__opt " + (s === "7" ? "is-on" : ""),
    onClick: () => setS("7")
  }, "7 d"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-segmented__opt " + (s === "30" ? "is-on" : ""),
    onClick: () => setS("30")
  }, "30 d"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-segmented__opt " + (s === "90" ? "is-on" : ""),
    onClick: () => setS("90")
  }, "90 d"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-segmented__opt " + (s === "all" ? "is-on" : ""),
    onClick: () => setS("all")
  }, "Todo")), /*#__PURE__*/React.createElement("div", {
    className: "dvr-segmented"
  }, /*#__PURE__*/React.createElement("button", {
    className: "dvr-segmented__opt " + (s === "list" ? "is-on" : ""),
    onClick: () => setS("list")
  }, "Lista"), /*#__PURE__*/React.createElement("button", {
    className: "dvr-segmented__opt " + (s === "timeline" ? "is-on" : ""),
    onClick: () => setS("timeline")
  }, "Cronolog\xEDa"))))));
}
window.TabsDemo = TabsDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dynamics-platform/Tags.jsx
try { (() => {
/* eslint-disable */
/* UI Kit demo · Tags, badges, status dots, program rings. */

function TagsDemo() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Status tags ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-tag--ok / --pend / --err / --info / --gray")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--ok"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot"
  }), "Completado"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--pend"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot"
  }), "Pendiente"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--err"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot"
  }), "No realizada"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot"
  }), "En curso"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--gray"
  }, "Borrador")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--lg dvr-tag--ok"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot"
  }), "Completado"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--lg dvr-tag--pend"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot"
  }), "Pendiente"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--lg dvr-tag--err"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot"
  }), "Cr\xEDtico")))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Program tags ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-tag--cervical / --lumbar / --hombro / --neuro")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--cervical"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot",
    style: {
      background: '#6E9EF3',
      opacity: 1
    }
  }), "Cervical"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--lumbar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot",
    style: {
      background: '#4385FA',
      opacity: 1
    }
  }), "Lumbar"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--hombro"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot",
    style: {
      background: '#2960C3',
      opacity: 1
    }
  }), "Hombro"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag dvr-tag--neuro"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-tag__dot",
    style: {
      background: '#7B6AE2',
      opacity: 1
    }
  }), "Neuro")))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Program rings ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-progdot--C / --L / --H / --N")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-progdot dvr-progdot--C"
  }, "C"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-progdot dvr-progdot--L"
  }, "L"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-progdot dvr-progdot--H"
  }, "H"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-progdot dvr-progdot--N"
  }, "N"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      marginLeft: 8
    }
  }, "Used as compact program identifiers next to session names.")))), /*#__PURE__*/React.createElement("div", {
    className: "kit__sub"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__sub-head"
  }, "Counter badges & status dots ", /*#__PURE__*/React.createElement("span", {
    className: "kit__code"
  }, ".dvr-badge \xB7 .dvr-status-dot")), /*#__PURE__*/React.createElement("div", {
    className: "kit__demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit__demo-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-badge"
  }, "3"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-badge dvr-badge--blue"
  }, "12"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-badge dvr-badge--ok"
  }, "+24"), /*#__PURE__*/React.createElement("span", {
    className: "dvr-badge dvr-badge--dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-badge dvr-badge--dot dvr-badge--blue"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dvr-badge dvr-badge--dot dvr-badge--ok"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-status-dot dvr-status-dot--ok"
  }), "Activa"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-status-dot dvr-status-dot--pend"
  }), "Pendiente"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-status-dot dvr-status-dot--err"
  }), "Cr\xEDtica"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dvr-status-dot dvr-status-dot--off"
  }), "Inactiva")))));
}
window.TagsDemo = TagsDemo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dynamics-platform/Tags.jsx", error: String((e && e.message) || e) }); }

})();
