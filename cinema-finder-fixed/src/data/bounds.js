

const countryBounds = {
  au: [112.669086, -43.696673, 153.726368, -10.737187],
  nz: [166.332922, -47.292562, 178.573837, -34.394162],
}

export const allCountryBounds = Object.values(countryBounds);



export const totalBounds = allCountryBounds.reduce(
  ([w1, s1, e1, n1], [w2, s2, e2, n2]) => ([
    Math.min(w1, w2),
    Math.min(s1, s2),
    Math.max(e1, e2),
    Math.max(n1, n2),
  ])
)