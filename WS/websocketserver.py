import asyncio
from websockets.asyncio.server import serve

chat_history = []

async def handler(websocket):
    global chat_history
    async for message in websocket:
        if message == '/history':
            for msg in chat_history:
                await websocket.send(msg)
        elif message == '/clear':
            chat_history = []
        else:
            chat_history.append(message)

async def main():
    async with serve(handler, 'localhost', 80):
        print('Starting')
        await asyncio.get_running_loop().create_future()

if __name__ == '__main__':
    asyncio.run(main())