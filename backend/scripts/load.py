from api.models import EarthquakeInfo
import pandas as pd

def run():
    
    csv_file_path = '../backend/datasets/phivolcs_earthquake_data.csv'
    df = pd.read_csv(csv_file_path).head(2001)
    
    # print(df)
        
    for index, row in df.iterrows():
        earth_quake = EarthquakeInfo.objects.create(
            date_time_ph=row['Date_Time_PH'],
            latitude=row['Latitude'],
            longtitude=row['Longitude'],
            magnitude=row['Magnitude'],
            location=row['Location'],
            specific_loc=row['Specific_Location'].strip(),
            general_loc=row['General_Location']
        )
        earth_quake.save()
        
    print("Test")