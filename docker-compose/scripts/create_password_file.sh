#!/bin/sh
set -e

echo "Starting create_password_file.sh script"

if [ -z "$MQTT_USERNAME" ] || [ -z "$MQTT_PASSWORD" ]; then
    echo "MQTT_USERNAME and MQTT_PASSWORD must be set"
    exit 1
fi

# Cria o diretório se não existir
mkdir -p /mosquitto/config

echo "Creating password file at /mosquitto/config/passwd"

# Cria o arquivo de senhas
mosquitto_passwd -c -b /mosquitto/config/passwd "$MQTT_USERNAME" "$MQTT_PASSWORD"

# Ajusta as permissões e propriedade do arquivo
chown mosquitto:mosquitto /mosquitto/config/passwd
chmod 600 /mosquitto/config/passwd

echo "Password file created successfully"
echo "Contents of /mosquitto/config:"
ls -la /mosquitto/config

echo "Finished create_password_file.sh script"

# Inicia o Mosquitto
exec /usr/sbin/mosquitto -c /mosquitto/config/mosquitto.conf