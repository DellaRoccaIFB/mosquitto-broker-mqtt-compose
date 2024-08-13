FROM eclipse-mosquitto:2.0

# Mantém o usuário root para operações iniciais
USER root

# Cria o diretório de configuração e ajusta as permissões
RUN mkdir -p /mosquitto/config && \
    chown -R mosquitto:mosquitto /mosquitto && \
    chmod -R 755 /mosquitto

# Copia o script de criação do arquivo de senhas
COPY ./scripts/create_password_file.sh /usr/local/bin/create_password_file.sh
RUN chmod +x /usr/local/bin/create_password_file.sh

# Cria um script de inicialização
RUN echo '#!/bin/sh' > /usr/local/bin/docker-entrypoint.sh && \
    echo 'set -e' >> /usr/local/bin/docker-entrypoint.sh && \
    echo '/usr/local/bin/create_password_file.sh' >> /usr/local/bin/docker-entrypoint.sh && \
    echo 'chown -R mosquitto:mosquitto /mosquitto' >> /usr/local/bin/docker-entrypoint.sh && \
    echo 'exec gosu mosquitto /usr/sbin/mosquitto -c /mosquitto/config/mosquitto.conf' >> /usr/local/bin/docker-entrypoint.sh && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

# Define o ponto de entrada
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]