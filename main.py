import plotly.graph_objects as go
import pandas as pd
from pandas.io.json import json_normalize
import json
import numpy as np

geojson = json.load(open("Data/hc_bikelanes.geojson"))

points = []

for  feature in geojson['features']:
    if feature['geometry']['type'] == 'Polygon':
        points.extend(feature['geometry']['coordinates'][0])    
        points.append([None, None]) # mark the end of a polygon   
    elif feature['geometry']['type'] == 'MultiPolygon':
        for polyg in feature['geometry']['coordinates']:
            points.extend(polyg[0])
            points.append([None, None]) #end of polygon
    elif feature['geometry']['type'] == "MultiLineString': 
        points.extend(feature['geometry']['coordinates'])
        points.append([None, None])
    else: pass   
    
lons, lats = zip(*points)  

fig = go.Figure(
    data=[
        go.Scattermapbox(
            name='High Comfort Bike Route',
            hoverinfo='name',
            lat=lats,
            lon=lons,
            mode="lines",
            line=dict(width=3, color="#F00")
        )
    ]
)
mapLegend = go.layout.Legend(
        x=0,
        y=1,
        traceorder="normal",
        font=dict(
            family="sans-serif",
            size=12,
            color="black"
        ),
        bgcolor="LightSteelBlue",
        bordercolor="Black",
        borderwidth=2
    )

fig.update_layout(
    showlegend=True,
    legend=mapLegend,
    margin={"r":0,"t":0,"l":0,"b":0},
    mapbox=go.layout.Mapbox(
        style="stamen-terrain", 
        zoom=12, 
        center_lat = 40.55,
        center_lon = -105.08,
    )
)
fig.show()