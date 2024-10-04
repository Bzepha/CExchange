import asyncio
from websockets.asyncio.server import serve

async def handler(websocket):
    async for message in websocket:
        print(message)

async def main():
    async with serve(handler, 'localhost', 80):
        print('Starting')
        await asyncio.get_running_loop().create_future()

if __name__ == '__main__':
    asyncio.run(main())