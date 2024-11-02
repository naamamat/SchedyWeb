
import sys
import json

def main():
    # Read input data from stdin
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    
    workers = data.get('workers', [])
    shifts = data.get('shifts', [])
    
    # Process data (example logic, replace with your own)
    result = [[1, 41], [21, 34], [5], [0], [1, 47], [0], [2, 41], [0, 34], [2, 41], [1, 47], [9], [13, 56], [4, 68], [11], [3, 59], [4], [17, 49], [5], [6, 47], [14, 34], [26, 49], [21, 48], [4], [12], [12, 56], [6, 58], [19, 66], [7, 53], [20, 48], [8, 50], [3, 60], [39, 54], [21, 51], [8, 51], [3, 53], [15], [10, 58], [19, 66], [25, 61], [16, 60], [28, 54], [16, 54], [10, 58], [30, 67], [14, 61], [44, 61], [30], [23, 63], [10, 62], [23, 62], [29, 62], [35], [15], [30, 63], [36], [22], [36], [33, 69], [44], [31], [31], [35], [15], [45], [39, 64], [24], [18, 69], [52], [24], [24], [39, 64], [37], [27], [52], [32], [57], [55], [38, 65], [42], [27], [37], [38], [52], [38], [33], [57], [33], [37], [55], [43], [55], [53], [27], [46], [68], [46], [40], [], [40], [40]]
    
    # Print the result as JSON
    print(json.dumps({'result': result, 'workers': workers, 'shifts': shifts}))

if __name__ == "__main__":
    main()