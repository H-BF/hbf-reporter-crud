
import parse from 'json-templates';

export const swaggerTemplate = parse({
  "openapi": "3.0.0",
  "info": {
    "title": "HBF REPORT CRUD",
    "description": "Описание API запросов для получения результатов функциональных тестов для HBF",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://{{host}}:{{port}}/hbf/v1"
    }
  ],
  "paths": {
    "/launch": {
      "get": {
        "summary": "Получение данных из launch по uuid",
        "parameters": [
          {
            "in": "query",
            "name": "uuid",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/launch"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/launchs": {
      "get": {
        "summary": "Получение списка лаунчей подходящих под условия",
        "parameters": [
          {
            "in": "query",
            "name": "pipeline",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "job",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "srcBranch",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "commit",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "tag",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "offset",
            "required": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "in": "query",
            "name": "limit",
            "required": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "in": "query",
            "name": "status",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "create",
                "in_process",
                "finish",
                "error"
              ]
            }
          },
          {
            "in": "query",
            "name": "serviceName",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "totalRows": {
                      "type": "number",
                      "description": "Общее количество строк в таблице launchs подходящих под заданные условия"
                    },
                    "launchs": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/launch"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/launch_error": {
      "get": {
        "summary": "Получение данных из launch_error по launchUuid",
        "parameters": [
          {
            "in": "query",
            "name": "launchUuid",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/launchError"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/assertions": {
      "get": {
        "summary": "Получение данных из assertion",
        "parameters": [
          {
            "in": "query",
            "name": "launchUUID",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "srcIp",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "srcPort",
            "required": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "in": "query",
            "name": "dstIp",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "dstPort",
            "required": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "in": "query",
            "name": "protocol",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "tcp",
                "udp",
                "icmp"
              ]
            }
          },
          {
            "in": "query",
            "name": "from",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "to",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "fromType",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "fqdn",
                "cidr",
                "sq"
              ]
            }            
          },
          {
            "in": "query",
            "name": "toType",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "fqdn",
                "cidr",
                "sg"
              ]
            }
          },
          {
            "in": "query",
            "name": "offset",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "limit",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "status",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "pass",
                "fail"
              ]
            }
          },
          {
            "in": "query",
            "name": "msgErr",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "icmpType",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "icmpCommand",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "traffic",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "ingress",
                "egress",
                "unknown"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/assertion"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }

    }
  },
  "components": {
    "schemas": {
      "launch": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "date": {
            "type": "string"
          },
          "pipeline": {
            "type": "number"
          },
          "job": {
            "type": "number"
          },
          "src_branch": {
            "type": "string"
          },
          "commit": {
            "type": "string"
          },
          "fail_count": {
            "type": "number"
          },
          "pass_count": {
            "type": "number"
          },
          "duration": {
            "type": "number"
          },
          "tag": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "create",
              "in_process",
              "finish",
              "error"
            ]
          },
          "serviceName": {
            "type": "string"
          }
        }
      },
      "launchError": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "launch_uuid": {
            "type": "string"
          },
          "messgae": {
            "type": "string"
          }
        }
      },
      "assertion": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "launch_uuid": {
            "type": "string"
          },
          "src_ip": {
            "type": "string"
          },
          "src_port": {
            "type": "string"
          },
          "dst_ip": {
            "type": "string"
          },
          "dst_port": {
            "type": "string"
          },
          "protocol": {
            "type": "string",
            "enum": [
              "tcp",
              "udp",
              "icmp"
            ]
          },
          "from": {
            "type": "string"
          },
          "to": {
            "type": "string"
          },
          "fromType": {
            "type": "string",
            "enum": [
              "fqdn",
              "cidr",
              "sg"
            ]
          },
          "toType": {
            "type": "string",
            "enum": [
              "fqdn",
              "cidr",
              "sg"
            ]
          },
          "status": {
            "type": "string",
            "enum": [
              "create",
              "in_process",
              "finish",
              "error"
            ]
          },
          "msg_err": {
            "type": "string"
          },
          "icmp_command": {
            "type": "string"
          },
          "icmp_type": {
              "type": "string"
          },
          "traffic": {
            "type": "string",
            "enum": [
              "ingress",
              "egress",
              "unknown"
            ]
          }
        }
      },
      "error": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "msg": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "object"
              }
            ]
          }
        }
      }
    }
  }
})