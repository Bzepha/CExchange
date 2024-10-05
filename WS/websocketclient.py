import asyncio
from websockets.sync.client import connect

def main():
    with connect('ws://localhost:80') as websocket:
        websocket.send("TEST")

if __name__ == '__main__':
    main()