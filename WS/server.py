import asyncio
from websockets

connected_clients = set()
chat_history = []

async def handler(websocket):
    global chat_history
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            if message == '/history':
                for msg in chat_history:
                    await websocket.send(msg)
            elif message == '/clear':
                chat_history.clear()
            else:
                chat_history.append(message)
                for client in connected_clients:
                    if client != websocket:
                        await client.send(message)
    finally:
        connected_clients.remove(websocket)

async def main():
    print('Attempting to start the server...')
    async with websockets.serve(handler, '0.0.0.0', 8080):
        print('Server started on was://0.0.0.0:8080')
        await asyncio.Future()

if __name__ == '__main__':
    asyncio.run(main())
